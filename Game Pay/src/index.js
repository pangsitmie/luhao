import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LoginProvider from "./LoginProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./i18n";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//APOLLO
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  gql,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

//REDUX
import store from "./redux/store";
import { Provider } from "react-redux";

let originalQuery;
let originalVariables;

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (!operation) {
    return;
  }

  if (graphQLErrors) {
    graphQLErrors.map(async ({ message, location, path, extensions }) => {
      console.log("ERROR DESC:");
      console.log(extensions.description);

      console.log("ERROR PATH:" + path);
      if (message === "Token過期") {
        console.log("TOKEN EXPIRES");

        originalQuery = operation.query;
        originalVariables = operation.variables;

        const login_token = localStorage.getItem("login_token");
        localStorage.removeItem("token");

        // Create the query document
        const query = gql`
          query GetManagerAccessToken($refreshToken: String!) {
            getManagerAccessToken(refreshToken: $refreshToken)
          }
        `;

        // Use the client.mutate method to make the query
        const { data } = await client.mutate({
          mutation: query,
          variables: {
            refreshToken: `Bearer ${login_token}`,
          },
        });

        const newToken = data.getManagerAccessToken;
        console.log("NEW TOKEN: ");
        console.log(newToken);
        // Store the new token in local storage
        localStorage.setItem("token", newToken);

        client.link = authLink = setContext((_, { headers }) => {
          return {
            headers: {
              ...headers,
              ...(newToken ? { authorization: `Bearer ${newToken}` } : {}),
            },
          };
        });

        // Re-execute the original query with the updated token and original variables
        client.query({ query: originalQuery, variables: originalVariables });
      } else {
        if (extensions.description[0]) {
          const { constraints } = extensions.description[0];
          const errorMessage = constraints && constraints.matches;

          if (errorMessage) {
            toast.error(errorMessage);
          } else {
            toast.error(extensions.description);
          }
        } else {
          toast.error(message);
        }
      }
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://market-test.cloudprogrammingonline.com/graphql/" }),
  // new HttpLink({uri: "https://market-qa.cloudprogrammingonline.com/graphql/"}),
  // new HttpLink({ uri: "https://market.cloudprogrammingonline.com/graphql/" }),
]);

let authLink = setContext((_, { headers }) => {
  // Get the access token from local storage
  const token = localStorage.getItem("token");

  // Return the headers to the context, including the authorization header if the token is not null
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      // cookie: `token=${token}; SameSite=None; Secure; HttpOnly;` // this one dont know whether to use or not
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: link

  //Use this if you want to use authLink
  link: authLink.concat(link),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ToastContainer />
      <BrowserRouter>
        <React.StrictMode>
          <Routes>
            <Route exact path="/*" element={<App />} />
            <Route path="/login/*" element={<LoginProvider />} />
          </Routes>
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
);
