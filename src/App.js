import React from 'react';
import { ReactAsyncApollo } from './lib';
import { Q_SPACE } from './query';

const App = () => {


  const handleWithPromise = async () => {
    try {
      let data = await ReactAsyncApollo(Q_SPACE, { type: "query" })
      console.log(data)
    } catch (error) {
      console.log(error);
    }
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