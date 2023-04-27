import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./i18n";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import type { ProcessEnv } from 'process';



//APOLLO
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  gql,
  DocumentNode,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

//REDUX
import store from "./redux/store";
import { Provider } from "react-redux";
import LoginProvider from "./LoginProvider";




let originalQuery: DocumentNode;
let originalVariables: Record<string, any> | undefined;


const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (!operation) {
    return;
  }
  if (networkError) {
    console.log("NETWORK ERROR");
    console.log(networkError);
  }

  if (graphQLErrors) {
    graphQLErrors.map(async ({ message, locations, path, extensions }) => {

      console.log("=========message=========");
      console.log(message);

      console.log("=========location=========");
      console.log(locations);

      console.log("=========PATH=========");
      console.log(path);

      console.log("=========EXTENSIONS=========");
      console.log(extensions);

      if (extensions.code === "Dx001") {
        console.log("重複的審核請求");
        toast.error("重複的審核請求");
      }

      if (extensions.code === "3x004") {
        console.log("權限不足");
      }

      if (extensions.code === "3x002") {
        console.log("TOKEN錯誤");

        localStorage.clear();
        client.clearStore();
        window.location.href = "/login";
      }

      if (extensions.code === "3x001") {
        console.log("TOKEN EXPIRES");

        originalQuery = operation.query;
        originalVariables = operation.variables;

        const login_token = localStorage.getItem("login_token");
        localStorage.removeItem("token");

        // Create the query document
        let query: DocumentNode;
        let reponseTokenPath: string;

        // Retrieve the stored value from local storage
        const storedValue = localStorage.getItem('entity');

        // Parse the stored value from a JSON string to a JavaScript object
        const entity = JSON.parse(storedValue!);
        console.log("ENTITY: ");
        console.log(entity);

        // Access the 'entityName' property of the parsed object
        const entityName = entity.entityName;
        console.log("ENTITY NAME: ");
        console.log(entityName);


        if (entityName === "brand") {
          query = gql`
            query getBrandPrincipalWebAccessToken($refreshToken: String!) {
              getBrandPrincipalWebAccessToken(refreshToken: $refreshToken)
            }
          `;

          reponseTokenPath = "getBrandPrincipalWebAccessToken";
          console.log("BRAND QUERY");
        }
        else if (entityName === "store") {
          query = gql`
            query Query($refreshToken: String!) {
              getStorePrincipalWebAccessToken(refreshToken: $refreshToken)
            }
          `;

          reponseTokenPath = "getStorePrincipalWebAccessToken";
          console.log("STORE QUERY");
        }
        else {
          query = gql`
            query GetManagerAccessToken($refreshToken: String!) {
              getManagerAccessToken(refreshToken: $refreshToken)
            }
          `;

          reponseTokenPath = "getManagerAccessToken";
          console.log("COMPANY QUERY");
        }
        console.log("QUERY: ");
        console.log(query);

        const newTokenPromise = client.mutate({
          mutation: query,
          variables: {
            refreshToken: `Bearer ${login_token}`,
          },
        }).then(({ data }) => data[reponseTokenPath])
          .catch((error) => {
            console.log("ERROR: ");
            console.log(error);
            toast.warning("登入逾時 請重新登入");
            // redirect to login page
            localStorage.clear();
            client.clearStore();

            window.location.href = "/login";
          });

        const [newToken] = await Promise.all([newTokenPromise]);
        console.log("CALL FOR NEW TOKEN FINISHED CALLING")

        console.log("NEW TOKEN: " + new Date());
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
        await executeOriginalQuery(operation);
      }
    });
  }
});

const executeOriginalQuery = async (operation: any) => {
  console.log("OPERATION OBJECT: ");
  console.log(operation);

  const { query } = operation;
  const isMutation = query.definitions.some((def: any) => def.operation === "mutation");
  if (isMutation) {
    console.log("MUTATION_AAA");
    // If the last operation was a mutation, re-execute it with the updated token and original variables
    await client.mutate({ mutation: originalQuery, variables: originalVariables });
  } else {
    console.log("QUERY_AAA");
    // If the last operation was a query, re-execute it with the updated token and original variables
    await client.query({ query: originalQuery, variables: originalVariables });
  }
  console.log("EXECUTE ORIGINAL QUERY FINISHED");
}



// const reactEnv = process.env.REACT_APP_ENDPOINT;
const viteEnv = import.meta.env.VITE_ENDPOINT;

console.log("ENVIRONTMENT: " + viteEnv);
let uri;

switch (viteEnv) {
  case 'main':
    uri = "https://market.cloudprogrammingonline.com/graphql/";
    break;
  case 'qa':
    uri = "https://market-qa.cloudprogrammingonline.com/graphql/";
    break;
  default:
    uri = "https://market-test.cloudprogrammingonline.com/graphql/";
}

const link = from([
  errorLink,
  new HttpLink({ uri }),
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
  link: authLink.concat(link),
});


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ToastContainer />
      <BrowserRouter>
        <React.StrictMode>
          <Routes>
            <Route path="/*" element={<App />} />
            <Route path="/login" element={<LoginProvider />} />
          </Routes>
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
)
