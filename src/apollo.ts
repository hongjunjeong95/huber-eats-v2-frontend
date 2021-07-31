import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { LOCALSTORATE_AUTH_TOKEN } from "./constants";

const token = localStorage.getItem(LOCALSTORATE_AUTH_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: authTokenVar() ? `Bearer ${authTokenVar()}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedInVar: {
            read() {
              return isLoggedInVar();
            },
          },
          authTokenVar: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
