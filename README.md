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

By default it will return promise

```
import React from 'react';
import { AsyncApollo } from 'react-async-apollo';
import { Q_GET_DINO } from './query';

const App = () => {

  const handleWithPromise = () => {
    AsyncApollo(Q_GET_DINO, { type: 'query', fetchPolicy: "network-only" })
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  };
  
  return (
    <div>
			<button type="button" onClick={handleWithPromise}>
				handle with promises
			</button>
    </div>
  )
};

export default App;
```

**Using Async-Await**

```
import React from 'react';
import { AsyncApollo } from 'react-async-apollo';
import { Q_GET_DINO } from './query';

const App = () => {

  const handleWithAsyncAwait = async () => {
    try {
      let data = await AsyncApollo(Q_GET_DINO, {type: "query", variables: {limit: 2}})
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
			<button type="button" onClick={handleWithAsyncAwait}>
				handle with async await
			</button>
    </div>
  )
};

export default App;
```

**Using callback**

You can use callback by passing it as a third parameters

```
import React from 'react';
import { AsyncApollo } from 'react-async-apollo';
import { Q_GET_DINO } from './query';

const App = () => {

  const handleWithCallBack = async () => {
    AsyncApollo(Q_GET_DINO, { type: "query" }, (err, data) => {
      if (data) {
        console.log(data)
      } else if (err) {
        console.log(err)
      }
    })
  };

  return (
    <div>
			<button type="button" onClick={handleWithCallBack}>
				handle with callback
			</button>
    </div>
  )
};

export default App;
```

**Using client** 

You can call the client by passing 'client' on first parameter. It will return as callback

```
import React from 'react';
import { AsyncApollo } from 'react-async-apollo';
import { Q_GET_DINO } from './query';

const App = () => {

  const handleWithClient = () => {
    AsyncApollo('client', async client => {
      let { data, errors } = await client.query({ query: Q_SPACE, errorPolicy: "all" });
      if (data) {
        console.log(data)
      } else if (errors) {
        console.log(errors)
      }
    })
  };

  return (
    <div>
			<button type="button" onClick={handleWithClient}>
				handle with client
			</button>
    </div>
  )
};

export default App;
```



### Mutation

Similar like fetching, but you passing type as 'mutation'

```
import React from 'react';
import { AsyncApollo } from 'react-async-apollo';
import { Q_LOGIN } from './query';

const App = () => {

  const handleWithPromise = () => {
    AsyncApollo(LOGIN, { type: 'mutation', variables: {email: "your@mail.com", password: "1234"}})
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  };
  
  return (
    <div>
			<button type="button" onClick={handleWithPromise}>
				handle with promises
			</button>
    </div>
  )
};

export default App;
```

Or use a client

```
import React from 'react';
import { AsyncApollo } from 'react-async-apollo';
import { Q_LOGIN } from './query';

const App = () => {

  const handleWithClient = () => {
    AsyncApollo('client', async client => {
      let { data, errors } = await client.mutate({ 
      	mutation: Q_LOGIN, 
      	variables: { email: "laskar@mail.com", password: "1234" } 
      	})
      if (data) console.log(data);
      if (errors) console.log(errors)
    })
  };
  
  return (
    <div>
			<button type="button" onClick={handleWithClient}>
				handle with client
			</button>
    </div>
  )
};

export default App;
```



## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section.



