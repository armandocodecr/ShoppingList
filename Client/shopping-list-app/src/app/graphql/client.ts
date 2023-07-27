import { ApolloClient, InMemoryCache } from "@apollo/client";
import Cookies from 'js-cookie'

//const token = Cookies.get('token')
const token = localStorage.getItem('token')

export const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql/', // Reemplaza con la URL de tu servidor NestJS
    headers: {
        authorization: token ? `Bearer ${token}` : ""
    },
    cache: new InMemoryCache(),
});