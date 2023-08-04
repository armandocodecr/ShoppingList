'use client'
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

import { addListInDB, addListItemInDB, getListsFromServer, updatedListItemInDB } from "../database/dbList"

import { useItems } from "./useItems"
import { useAllListsStore } from "../store/lists"
import { useInputs, useCurrentUserList } from "../store"

import { IAccLists, IList, IListSorted } from "../interface/ListInterfaces"
import { IArrayItems, IPropertyItems } from "../interface/DataInterface"

import { onDeleteItemsOfState } from "../utils/DeleteItemsOfState"
import { toast } from "sonner"

export function useList () {

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

const { getAllItems } = useItems()

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
      const updatedItems = propertyItem.items.map((item) => {
        if (item.name === itemToUpdate.name) {
          const newQuantityItem = Math.max(itemToUpdate.quantity + newQuantity, 0)
          return { ...item, quantity: newQuantityItem }; // Actualiza solo el quantity del item
        }
        return item;
      });
  
      return { ...propertyItem, items: updatedItems }; // Retorna una copia del propertyItem con los items actualizados
    });
  updateState(updatedData)
}

const getListsToHistory = async () => {
      
  const lists = await getListsFromServer()
  if( !lists.ok ) return
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

const handleDeleteItemsInDB = async(currentItem: IPropertyItems, itemName: string, index: number) => {
  const dataItems: IPropertyItems[] = data
  const newDataItem = onDeleteItemsOfState({ dataItems, currentItem, itemName, index })
  updateState(newDataItem!)
  await getAllItems()
}

const onCompletedItemState = (category: string, id: string) => {
  if (!data) return;
  const newData = data.map((item) => {
    if (item.category === category) {
      return {
        ...item,
        items: item.items.map((currentItem) => {
          if (currentItem.item.id === id) {
            const currentCompletedState = currentItem.completed;
            currentItem.completed = !currentCompletedState;
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
      onAddItemToShoppingList,
      updateState,
      onChangeQuanity,
      handleDeleteItemsInDB,
      getListsToHistory,
      onCompletedItemState

  }

}