import { client } from "../graphql/client";
import { addList, addListItem, getListItemByID, getLists, removedList, updatedList, updatedListItem } from "../graphql/queries";
import { IDataLists } from "../interface/ListInterfaces";

export const addListInDB = async( nameList: string ) => {

    const result: any = client
    .mutate({
      mutation: addList,
      variables:{
        createListInput: {
            name: nameList, 
            completed: false,
        }
      }
    })
    .then((result) => {
      // Maneja la respuesta de la query aquí
      return { ok: true, dataList: result.data };
    }).catch(err => {
      return { ok: false, data: err }
    })

    return result
  
}

export const updatedListInDB = async( id: string, isListCompleted: boolean ) => {

  const result: any = client
  .mutate({
    mutation: updatedList,
    variables:{
      updateListInput: {
        id,
        completed: !isListCompleted
      }
    }
  })
  .then((result) => {
    // Maneja la respuesta de la query aquí
    return { ok: true, dataListItem: result.data };
  }).catch(err => {
    return { ok: false, dataListItem: err }
  })

  return result

}

export const getListsFromServer = async() => {
      
  // Ejecuta la query utilizando el método 'query' de Apollo Client
  const result: any = await client
  .query({
    query: getLists,
    fetchPolicy: "no-cache"
  })
  .then((result) => {
    // Maneja la respuesta de la query aquí
    return { ok: true, data: result.data.lists };
  }).catch(err => {
    const textError = String(err.graphQLErrors[0].message)
    return { ok: false, data: textError }
  })

  const promiseResult: IDataLists = result
  return promiseResult

}

export const removedListInDB = async( id: string ) => {

  const result: any = client
  .mutate({
    mutation: removedList,
    variables:{
      removeListId: id 
    }
  })
  .then((result) => {
    // Maneja la respuesta de la query aquí
    return { ok: true, dataListItem: result.data };
  }).catch(err => {
    return { ok: false, dataListItem: err }
  })

  return result

}

export const addListItemInDB = async( itemId: string, listId: string, quantity: number ) => {

  const result: any = client
  .mutate({
    mutation: addListItem,
    variables:{
      createListItemInput: {
        itemId,
        listId,
        quantity
      }
    }
  })
  .then((result) => {
    // Maneja la respuesta de la query aquí
    return { ok: true, dataListItem: result.data };
  }).catch(err => {
    return { ok: false, dataListItem: err }
  })

  return result

}

export const updatedListItemInDB = async( id: string, completed: string, quantity: number ) => {

  const result: any = client
  .mutate({
    mutation: updatedListItem,
    variables:{
      updateListItemInput: {
        id,
        completed,
        quantity
      }
    }
  })
  .then((result) => {
    // Maneja la respuesta de la query aquí
    return { ok: true, dataListItem: result.data };
  }).catch(err => {
    return { ok: false, dataListItem: err }
  })

  return result

}

export const getListItemByIDFromServer = async( id: string ) => {
      
  // Ejecuta la query utilizando el método 'query' de Apollo Client
  const result: any = await client
  .query({
    query: getListItemByID,
    variables: {
      listId: id
    },
    fetchPolicy: "no-cache"
  })
  .then((result) => {
    // Maneja la respuesta de la query aquí
    return { ok: true, data: result.data.list };
  }).catch(err => {
    const textError = String(err.graphQLErrors[0].message)
    return { ok: false, data: textError }
  })

  const promiseResult: any = result
  return promiseResult

}