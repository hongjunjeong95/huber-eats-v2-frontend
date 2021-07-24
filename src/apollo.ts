import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { LOCALSTORATE_AUTH_TOKEN } from "./constants";

const token = localStorage.getItem(LOCALSTORATE_AUTH_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
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
