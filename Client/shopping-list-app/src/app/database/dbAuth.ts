import { client } from "../graphql/client";
import { signup, signin } from '../graphql/queries';
import { ISignInData, ISignUpData } from "../interface/AuthInterfaces";


export const Signup = async( userData: ISignUpData ) => {

    const { username, email, password } = userData;
      
    // Ejecuta la query utilizando el método 'query' de Apollo Client
    const result: any = client
    .mutate({
      mutation: signup,
      variables:{
          signupInput:{
            username,
            email,
            password
          }
      }
    })
    .then((result) => {
      // Maneja la respuesta de la query aquí
      return { ok: true, data: result.data };
    }).catch(err => {
      const textError = String(err.graphQLErrors[0].message)
      const positionErrorSplice = textError.indexOf(" already exists")
      const resultError = "This email" + textError.substring(positionErrorSplice)
      return { ok: false, data: resultError }
    })

    return result

}

export const Signin = async( userData: ISignInData ) => {

  const { email, password } = userData;
    
  // Ejecuta la query utilizando el método 'query' de Apollo Client
  const result: any = client
  .mutate({
    mutation: signin,
    variables:{
        loginInput:{
          email,
          password
        }
    }
  })
  .then((result) => {
    // Maneja la respuesta de la query aquí
    return { ok: true, data: result.data };
  }).catch(err => {
    const textError = String(err.graphQLErrors[0].message)
    return { ok: false, data: textError }
  })

  return result

}