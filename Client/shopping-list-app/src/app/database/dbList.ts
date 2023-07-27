import { client } from "../graphql/client";
import { addList, addListItem } from "../graphql/queries";

export const addListInDB = async( nameList: string ) => {

    const result: any = client
    .mutate({
      mutation: addList,
      variables:{
        createListInput: {
            name: nameList
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