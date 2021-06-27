import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { InitProvider } from './lib'


const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <InitProvider client={client}>
      <App />
    </InitProvider>
  </ApolloProvider>
  ,
  document.getElementById('root')
);

