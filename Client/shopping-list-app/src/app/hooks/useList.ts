'use client'
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

import { addListInDB, addListItemInDB, getListsFromServer, updatedListItemInDB } from "../database/dbList"

import { useAllListsStore } from "../store/lists"
import { useItems } from "./useItems"
import { useInputs, useCurrentUserList } from "../store"

import { IAccLists, IList, IListSorted } from "../interface/ListInterfaces"
import { IArrayItems } from "../interface/DataInterface"

import { toast } from "sonner"
import { ListItemUserData } from "../interface/ListItemInterfaces"
import { onDeleteItemsOfState } from "../utils/DeleteItemsOfState"

export function useList () {

  const { getAllItems } = useItems()

  const { inputSaveListValue, updateSaveListValue } = useInputs(state => ({
      inputSaveListValue  : state.inputSaveListValue,
      updateSaveListValue : state.updateSaveListValue
  }))

  const { data, updateState } = useCurrentUserList(state => ({
      data                : state.items,
      updateState         : state.setUpdateItems
  }))

  const { updateLists } = useAllListsStore(state => ({
    dataLists             : state.dataLists,
    updateLists           : state.updateLists
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

const dataList = useHidratedListStore(useCurrentUserList, (state) => state)
const onChangeQuanity = ( itemToUpdate: IArrayItems, newQuantity: number, categoryItem: string ) => {
  const updatedData = data.map((propertyItem) => {
      const updatedItems = propertyItem.items.map((currItem) => {
        if (currItem.item.name === itemToUpdate.item.name) {
          const newQuantityItem = Math.max(itemToUpdate.quantity + newQuantity, 0)
          return { ...currItem, quantity: newQuantityItem }; // Actualiza solo el quantity del item
        }
        return currItem;
      });
  
      return { ...propertyItem, items: updatedItems }; // Retorna una copia del propertyItem con los items actualizados
    });
  updateState(updatedData)
}

const getListsToHistoryAndStatistics = async () => {
      
  const lists = await getListsFromServer()

  if( !lists.ok && !lists.data ) return
  lists.data.sort((a,b)=> a.creadtedAt!.localeCompare(b.creadtedAt!.toString()))
  const listsSorted = lists.data.reduce((acc: IAccLists, item: IList) => {
      const dateTrim  = item.creadtedAt!.slice(0, 10)
      const dateList  = new Date(dateTrim).toLocaleDateString('es', { day:"numeric", year:"numeric", month:"long"});
      const monthNameAndYear = new Date(dateTrim).toLocaleDateString('es', { year: "numeric", month:"long"}).split(' de ');
      const dateConcat: string = monthNameAndYear[0] + ' ' + monthNameAndYear[1];
      if (!acc[dateConcat]) {
        acc[dateConcat] = []
      }
      const newListToAcc: IList = {
          completed    : item.completed,
          id           : item.id,
          name         : item.name,
          items        : item.items,
          creadtedAt   : dateList
      }
      acc[dateConcat].push(newListToAcc);
      return acc;
    }, {});
    const result: IListSorted[] = Object.keys(listsSorted).map((list) => ({
          createdMonthAt: list,
          infoItemsList: listsSorted  [list],
      }));
    updateLists(result)
} 

const handleDeleteItemsInState = async(currentItem: ListItemUserData, itemName: string, index: number) => {
 const dataItems: ListItemUserData[] = data
 const newDataItem = onDeleteItemsOfState({ dataItems, currentItem, itemName, index })
 updateState(newDataItem!)
 await getAllItems()
}

const onCompletedItemState = (category: string, id: string, completedState: boolean) => {
  if (!data) return;
  const newData = data.map((item) => {
    if (item.category === category) {
      return {
        ...item,
        items: item.items.map((currentItem) => {
          if (currentItem.item.id === id) {
            currentItem.completed = completedState;
            updatedListItemInDB(currentItem.listItemId, currentItem.completed, currentItem.quantity)
          }
          return currentItem;
        }),
      };
    }
    return item;
  });

  updateState(newData);
};
    
const onAddItemToShoppingList = () => {

  if( data.length === 0 ){
    toast.error('Debes agregar items a la lista')
    return
  }

  Swal.fire({
      title: 'Are you sure to save this list??',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        const { ok, dataList } = await addListInDB(inputSaveListValue)
        updateState([])
        updateSaveListValue('')
        if( !ok ) {
          Swal.fire({
              icon  : 'error',
              title : 'Oops...',
              text  : 'Something went wrong!',
          })
          return
        }
        data.forEach(dataItem => {
          dataItem.items.forEach(async(item) => {
              const { ok } = await addListItemInDB( item.id, dataList.createList.id, item.quantity )
              if( !ok ){
                  Swal.fire({
                      icon  : 'error',
                      title : 'Oops...',
                      text  : 'Something went wrong!',
                  })
                  return
              }
          })
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

useEffect(() => {

  window.addEventListener('storage', ev => {
    if( ev.key === useCurrentUserList.persist.getOptions().name && ev.newValue ){
      useCurrentUserList.persist.rehydrate()
    }
  })
}, [])

  return {

      //Variables
      inputSaveListValue,
      dataList,

      //Methods
      updateSaveListValue,
      handleDeleteItemsInState,
      onAddItemToShoppingList,
      updateState,
      onChangeQuanity,
      getListsToHistoryAndStatistics,
      onCompletedItemState

  }

}