import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import GetStoreCoordinate from './components/GetStoreCoordinate';
import Form from './components/Form';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`)
    })
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://market-test.cloudprogrammingonline.com/graphql/" })
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <GetStoreCoordinate />
        <Form />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </ApolloProvider>
    </div>
  );
}

export default App;
