import { ApolloClient, InMemoryCache } from '@apollo/client';
import { API_BASE_URL } from '../../config';

const client = new ApolloClient({
  uri: API_BASE_URL,
  cache: new InMemoryCache(),
});

export default client;