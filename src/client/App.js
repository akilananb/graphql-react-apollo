import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

// apollo client setup
const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://graphql-react-apollo.herokuapp.com/graphql'
      : 'http://localhost:4000/graphql',
});
const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <h1>Reading List</h1>
      <BookList />
      <AddBook />
    </div>
  </ApolloProvider>
);

export default App;
