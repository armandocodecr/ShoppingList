'use client'
import { useCurrentUserList } from "../store"
import { useAllListItemStore } from "../store/listItem"

import { getListItemByIDFromServer } from "../database/dbList"

import { CategorizedListItem, IListItemElement, IListItemItems, ListItemUserData, dataItemList } from "../interface/ListItemInterfaces"

import { formatDate } from "../utils/formatDate."
import { useState, useEffect } from "react"
import { useList } from "./useList"

export function useListItem( itemList?: dataItemList) {

  const [completed, setCompleted] = useState(itemList?.completed);
  const [quantity, setQuantity] = useState(itemList?.quantity);
  const [originalCompleted, setOriginalCompleted] = useState(itemList?.completed);
  const [originalQuantity, setOriginalQuantity] = useState(itemList?.quantity);
  const { onCompletedItemState } = useList()

  const hasChanges = completed !== originalCompleted || quantity !== originalQuantity;

  const { dataListItem, updateListItem } = useAllListItemStore(state => ({
    dataListItem  : state.dataListItem,
    updateListItem: state.updateListItem
  }))

  const { data, updateState } = useCurrentUserList(state => ({
    data          : state.items,
    updateState   : state.setUpdateItems
  }))

  const useHidratedListStore = <T, F>( //Devuelve el estado actualizado tanto en el cliente como en el servidor
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

const dataListItemHidrated = useHidratedListStore(useCurrentUserList, (state) => state.items)
    
  const getListItemByID = async ( id: string ) => {
      
      const getListItem = await getListItemByIDFromServer( id )

      const items = getListItem.data.items;
      const categorizedItems: CategorizedListItem = {};
    
      items.forEach((currentListItem: IListItemElement) => {
        if(!currentListItem.item.category) return
        const categoryName = currentListItem.item.category.name;
        if (!categorizedItems[categoryName]) {
          categorizedItems[categoryName] = [];
        }

        const currentItem: IListItemItems = {
          id          : currentListItem.item.id,
          name        : currentListItem.item.name,
          category    : currentListItem.item.category
        }

        categorizedItems[categoryName].push({
          listItemId: currentListItem.id,
          item      : currentItem,
          quantity  : currentListItem.quantity,
          completed : currentListItem.completed,
        });
      });

      const result: ListItemUserData[] = [];
      for (const category in categorizedItems) {
        if (Object.hasOwnProperty.call(categorizedItems, category)) {
          result.push({
            listId  : getListItem.data.id,
            category,
            items   : categorizedItems[category],
          });
        }
      }
      updateState(result)

      updateListItem({
        listId    : getListItem.data.id,
        completed : getListItem.data.completed,
        listName  : getListItem.data.name,
        createdAt : formatDate(getListItem.data.creadtedAt),
        listItem  : result
      })
  }
  
    const handleQuantityChange = (amount: number) => {
      const newValue = Math.max(quantity! + amount, 0)
      setQuantity(newValue);
    };
  
    const handleConfirmChanges = ( category: string, id: string ) => {
      if( !itemList ) return
      itemList.completed = completed ?? false;
      itemList.quantity = quantity ?? 0;
      itemList.isChange = true;

      setOriginalCompleted(completed)
      setOriginalQuantity(quantity)
      const newCurrentList = data?.map((item) => {
          if (item.category === category) {
            return {
              ...item,
              items: item.items.map((currentItem: any) => {
                if (currentItem.item.id === id) {
                  currentItem.completed = completed
                  currentItem.quantity = quantity
                }
                return currentItem;
              }),
            };
          }
          return item;
        });
        updateState(newCurrentList)
        onCompletedItemState(category, id, completed ?? false)
    };
  
    const handleCancelChanges = () => {
      setCompleted(originalCompleted);
      setQuantity(originalQuantity);
    };

  return {
    //variables
    getListItemByID,
    dataListItem,
    data,
    dataListItemHidrated,
    completed,
    quantity,
    hasChanges,

    //methods
    updateListItem,
    handleQuantityChange,
    handleConfirmChanges,
    handleCancelChanges,
    setCompleted
  }

}