import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'; // Asegúrate de importar NormalizedCacheObject
import Cookies from 'js-cookie';

let client: ApolloClient<NormalizedCacheObject> | null = null;

const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql/',
  });

  const authLink = setContext((_, { headers }) => {
    const token = Cookies.get('token') || '';
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = () => {
  if (!client) {
    client = createApolloClient();
  }
  return client;
};
