# react-async-apollo

This was develop for handling asynchronous in various way on Apollo Client, make sure React and Apollo Client was already installed on your project.

You can see how to install Apolo Client on this following docs 

https://www.apollographql.com/docs/react/get-started/

# Install

```
$ npm install react-async-apollo
```



# Usage

**Initialize InitProvider**

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { InitProvider } from 'react-async-apollo';


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
```



