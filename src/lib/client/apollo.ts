import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  split
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { API_BASE_URL, WS_BASE_URL } from '../../config';
import { onError } from '@apollo/client/link/error';
import sessionStorage from "../storage/session";
import { TOKEN } from "@/features/auth/constants";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from "@apollo/client/utilities";


const httpLink = createHttpLink({
  uri: API_BASE_URL
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    const unauthorized = graphQLErrors.find(error => error.extensions?.statusCode === 401)

    if (unauthorized) location.replace('/login')
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});


const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem(TOKEN)

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const wsLink = new GraphQLWsLink(createClient({
  url: WS_BASE_URL,
}),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const link = ApolloLink.from([
  errorLink,
  authLink,
  splitLink
])

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  connectToDevTools: import.meta.env.DEV ? true : false
});

export default client;