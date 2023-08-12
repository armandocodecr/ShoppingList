'use client'
import { useEffect } from 'react';
import Swal from "sweetalert2";
import { toast } from "sonner";

import { useCurrentUserList, useAllItems, useInputs } from "../store/"

import { getItemFromServer, removeItemInDB } from "../database/dbItems"

import { IPropertyItems, IDataFromServer, IAccItems, IDataItems, IArrayItems, Item, Category } from '../interface/DataInterface';

import { onDeleteItemsOfState } from "../utils/DeleteItemsOfState";
import { ListItemUserData } from '../interface/ListItemInterfaces';


export function useItems() {

    const { dataItems, updateItems } = useAllItems(state => ({
        dataItems       : state.dataItems,
        updateItems     : state.updateItems,
    }))
    
    const { items, setUpdateItems } = useCurrentUserList(state => ({
        items           : state.items,
        setUpdateItems  : state.setUpdateItems
    }))

    const { inputValue } = useInputs(state => ({
        inputValue      : state.inputValue,
        updateInputValue: state.updateInputValue
    }))

    const getAllItems = async() => {
       
        const getItems: IDataFromServer = await getItemFromServer()
        if( !getItems.ok ) return
        const categorys = getItems.data.reduce((acc: IAccItems, item: IDataItems) => {
            const categoryName = item.category.name;
            if (!acc[categoryName]) {
              acc[categoryName] = [];
            }
            const newItem: Item = {
              name     : item.name,
              id       : item.id,
              category : item.category
            }
            const newItemToAcc: IArrayItems = {
                id      : item.id,
                item    : newItem,
                quantity: 1
            }
            acc[categoryName].push(newItemToAcc);
            return acc;
          }, {});
        
        const result: IPropertyItems[] = Object.keys(categorys).map((nombre) => ({
          category: nombre,
          items   : categorys  [nombre],
        }));
        
        updateItems(result)

    }

    useEffect(() => {
      getAllItems()
    }, [])

    useEffect(() => {
        if( inputValue === '' ) getAllItems()

        let search = inputValue.toLowerCase()
        const arraySearch = dataItems.filter(currItem => {
            return currItem.items.some((item) => item.item.name.toLowerCase().includes(search))
        })

        let newNamesArray: Array<IArrayItems> = []
        arraySearch.map((item) => {
          item.items = item.items.filter((item) => item.item.name.toLowerCase().includes(search));
          newNamesArray = newNamesArray.concat(item.items);
          return item;
        })
        updateItems(arraySearch)
    }, [inputValue])
    
    const handleDeleteItemsInDB = async(currentItem: ListItemUserData | IPropertyItems, itemName: string, index: number, idItem: string) => {
      Swal.fire({
          title: 'Are you sure you want to delete this item?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't delete`,
        }).then(async(result) => {
          if (result.isConfirmed) {
              let result = await removeItemInDB( idItem )
              const dataItems: ListItemUserData[] = items

              if( result.ok ){
                  const newDataItem = onDeleteItemsOfState({ dataItems, currentItem, itemName, index })
                  updateItems(newDataItem!)
                  await getAllItems()
              }else{
                  toast.error("We cannot delete the item because it is related to one of your created lists.")
              }
          } else if (result.isDenied) {
            Swal.fire('The item has not been deleted', '', 'info')
          }
        })
    }

    const addItemsToList = ( category: string, itemName: string, idItem: string ) => {

        const newCategory: Category = {
          name : category
        }

        const newItemToList: Item = {
          name     : itemName,
          id       : idItem,
          category : newCategory
        }
      
        const newItem: IArrayItems = {
            id      : idItem,
            item    : newItemToList,
            quantity: 1
          };
        
          if (items.length === 0) {
            setUpdateItems([{ listId: idItem, category, items: [newItem] }]);
            return;
          }
        
          const existingItem = items.find((item) => item.category === category);

          if (!existingItem) {
            const newItemEntry: ListItemUserData = {
              listId: idItem,
              category,
              items   : [newItem],
            };
            const updatedArray: ListItemUserData[] = [...items, newItemEntry];
            setUpdateItems(updatedArray);
            return; 
          }
        
          // Si ya existe una entrada con la categoría, agregamos el nuevo item al array de items
          const newItems = items.map((item) => {
            if (item.category === category) {
              const currentItemArray = item.items;
              const currentItemsName: string[] = item.items.map((currentItem) => currentItem.item.name);
              if (!currentItemsName.includes(itemName)) currentItemArray.push(newItem);
              return { ...item, items: currentItemArray.filter((currentItem) => currentItem.item.name !== '') };
            }
            return item;
          });
        
          setUpdateItems(newItems.filter((item, i) => i <= dataItems.length - 1 && item));

    }

    return {
        //Variable
        dataItems,

        //Methods
        addItemsToList,
        updateItems,
        getAllItems,
        handleDeleteItemsInDB,
    }

}