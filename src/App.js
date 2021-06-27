import React from 'react';
import { ReactAsyncApollo } from './lib';
import { Q_SPACE } from './query';

const App = () => {

  //Handle with promise
  const handleWithPromise = () => {
    ReactAsyncApollo(Q_SPACE, { type: 'Query' })
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  };

  return (
    <div>
      <h1>REACT ASYNC</h1>
      <div style={{ height: "80vh", width: '100%', display: 'flex', justifyContent: 'center', alignItems: "center" }}>
        <button type="button" onClick={handleWithPromise}>Get with promise</button>
      </div>
    </div>
  )
};

export default App;