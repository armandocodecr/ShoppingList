import { ApolloClient, HttpLink, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

//const token = localStorage.getItem('token') || ''
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql/',
});

const authLink = setContext((_, { headers }) => {

  const token = Cookies.get('token') || ''

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export let client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});