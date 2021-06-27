# react-async-apollo

This was develop for handling asynchronous in various way on Apollo Client, make sure React and Apollo Client was already installed on your project.

You can see how to install Apolo Client on this following docs 

https://www.apollographql.com/docs/react/get-started/

## Install

```
$ npm install react-async-apollo
```



## **Initialize InitProvider**

import InitProvider and mounted on index.js, insert client as props and wrapped the <App/>

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { InitProvider } from 'react-async-apollo';

const client = new ApolloClient({
  uri: '<YOUR GRAPHQL URI>',
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



## Basic usage

**ReactAsyncApollo(Query, options, [callback])**

| options   | Type   | Required | Value                                                 |
| --------- | ------ | -------- | ----------------------------------------------------- |
| type      | String | Required | query / mutation                                      |
| variables | Object | Optional | variables that you will include in your graphql query |

You can also add options that are in the apollo client documentation such as errorPolicy, fetchPolicy.

View more https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies

### Fetching

Query sample

```
const Q_GET_DINO = gql`
   {
      dino {
         name
         type
         age
      }
   }
` 
```

**Using Promises**

```
import React from 'react';
import { ReactAsyncApollo } from 'react-async-apollo';

const App = () => {

  const handleWithPromise = () => {
    ReactAsyncApollo(Q_GET_DINO, { type: 'query' })
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  };
  
  return (
    <div>
			<button type="button" onClick={handleWithPromise}>
				Fetch with promises
			</button>
    </div>
  )
};

export default App;
```

**Using Async-Await**

```
import React from 'react';
import { ReactAsyncApollo } from 'react-async-apollo';

const App = () => {

  const handleWithAsyncAwait = async () => {
    try {
      let data = await ReactAsyncApollo(Q_GET_DINO, {type: "query"})
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
			<button type="button" onClick={handleWithAsyncAwait}>
				Fetch with async await
			</button>
    </div>
  )
};

export default App;
```

