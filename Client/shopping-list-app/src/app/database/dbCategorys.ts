import { client } from '../graphql/client';
import { addCategory, getAllCategorys } from '../graphql/queries';
import { IDataFromServer } from '../interface/DataInterface';

export const addCategoryInDB = async( nameCategory: string ) => {

  const result: any = client
  .mutate({
    mutation: addCategory,
    variables:{
      createCategoryInput: {
        name: nameCategory,
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

export const getCategorysFromServer = async() => {
      
    // Ejecuta la query utilizando el método 'query' de Apollo Client
    const result: any = await client
    .query({
      query: getAllCategorys,
      fetchPolicy: "no-cache"
    })
    .then((result) => {
      // Maneja la respuesta de la query aquí
      return { ok: true, data: result.data.categories };
    }).catch(err => {
      const textError = String(err.graphQLErrors[0].message)
      return { ok: false, data: textError }
    })

    const promiseResult: IDataFromServer = result
    return promiseResult
  
}