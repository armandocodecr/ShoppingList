'use client'
import Swal from "sweetalert2"
import { addListInDB, addListItemInDB } from "../database/dbList"
import { useInputs, useCurrentUserList } from "../store"
import { useEffect, useState } from "react"
import { IArrayItems, IPropertyItems } from "../interface/DataInterface"
import { onDeleteItemsOfState } from "../utils/DeleteItemsOfState"
import { useItems } from "./useItems"

export function useList () {

    const { inputSaveListValue, updateSaveListValue } = useInputs(state => ({
        inputSaveListValue: state.inputSaveListValue,
        updateSaveListValue: state.updateSaveListValue
    }))

    const { data, updateState } = useCurrentUserList(state => ({
        data: state.items,
        updateState: state.setUpdateItems
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

  useEffect(() => {
  
    window.addEventListener('storage', ev => {
      if( ev.key === useCurrentUserList.persist.getOptions().name && ev.newValue ){
        useCurrentUserList.persist.rehydrate()
      }
    })

  }, [])

  const handleDeleteItemsInDB = async(currentItem: IPropertyItems, itemName: string, index: number) => {

    const dataItems: IPropertyItems[] = data
    const newDataItem = onDeleteItemsOfState({ dataItems, currentItem, itemName, index })

    updateState(newDataItem!)
    await getAllItems()

  }
    
  const onAddItemToShoppingList = () => {
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
            if( !ok ) {
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
              })
              return
            }
            data.forEach(dataItem => {
              dataItem.items.forEach(async(item) => {
                  const { ok } = await addListItemInDB( item.id, dataList.createList.id, item.quantity )
                  if( !ok ){
                      Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'Something went wrong!',
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

  return {

      //Variables
      inputSaveListValue,
      dataList,

      //Methods
      updateSaveListValue,
      onAddItemToShoppingList,
      updateState,
      onChangeQuanity,
      handleDeleteItemsInDB

  }

}