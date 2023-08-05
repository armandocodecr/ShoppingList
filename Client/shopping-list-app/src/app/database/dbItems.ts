import { client } from "../graphql/client";
import { addItem, getItems, removeItem } from "../graphql/queries";
import { IDataFromServer } from "../interface/DataInterface";

export const addItemInDB = async( categoryId: string, nameItem: string ) => {

  const result: any = client
  .mutate({
    mutation: addItem,
    variables:{
      createItemInput: {
        categoryId,
        name: nameItem,
      }
    }
  })
  .then((result) => {
    // Maneja la respuesta de la query aquí
    return { ok: true, dataItem: result.data };
  }).catch(err => {
    return { ok: false, dataItem: err }
  })

  return result

}

export const getItemFromServer = async() => {
      
    // Ejecuta la query utilizando el método 'query' de Apollo Client
    const result: any = await client
    .query({
      query: getItems,
      fetchPolicy: "no-cache"
    })
    .then((result) => {
      // Maneja la respuesta de la query aquí
      return { ok: true, data: result.data.items };
    }).catch(err => {
      const textError = String(err.graphQLErrors[0].message)
      return { ok: false, data: textError }
    })

    const promiseResult: IDataFromServer = result
    return promiseResult
  
}

export const removeItemInDB = async( itemId: string ) => {
  const result: any = client
  .mutate({
    mutation: removeItem,
    variables:{
      removeItemId: itemId
    }
  })
  .then((result) => {
    // Maneja la respuesta de la query aquí
    return { ok: true, dataItem: result.data };
  }).catch(err => {
    return { ok: false, dataItem: err }
  })

  return result

}