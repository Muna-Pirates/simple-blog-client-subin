import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { API_BASE_URL } from '../../config';
import sessionStorage from "../storage/session";
import { TOKEN } from "@/features/auth/constants";

const httpLink = createHttpLink({
  uri: API_BASE_URL
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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;