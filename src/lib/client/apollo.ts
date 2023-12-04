import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { API_BASE_URL } from '../../config';
import { onError } from '@apollo/client/link/error';
import { authTokenVar } from "@/features/auth/service/useAuth";

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
  const token = authTokenVar()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const link = ApolloLink.from([
  errorLink,
  authLink,
  httpLink
])

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;