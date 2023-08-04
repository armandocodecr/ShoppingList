'use client'
import { useCurrentUserList } from "../store"
import { useAllListItemStore } from "../store/listItem"

import { getListItemByIDFromServer } from "../database/dbList"

import { CategorizedListItem, IListItemElement, IListItemItems, ListItemUserData } from "../interface/ListItemInterfaces"

import { formatDate } from "../utils/formatDate."

export function useListItem() {

  const { dataListItem, updateListItem } = useAllListItemStore(state => ({
    dataListItem  : state.dataListItem,
    updateListItem: state.updateListItem
  }))

  const { data, updateState } = useCurrentUserList(state => ({
    data          : state.items,
    updateState   : state.setUpdateItems
  }))
    
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

  return {
    //variables
    getListItemByID,
    dataListItem,
    data,

    //methods
    updateListItem,
  }

}