import React from 'react';

let client;
let mutation = "mutation";
let query = "query";

/**
 *
 * @param {*} newClient
 * @returns
 */
const InitClient = (newClient) => {
   return client = newClient
};

/**
 *
 * @param {*} param0
 * @returns
 */
export const InitProvider = ({ client: newClient, children }) => {

   InitClient(newClient);

   return (
      <React.Fragment>
         { children}
      </React.Fragment>
   )
};

/**
 *
 * @param {*} Query
 * @param {*} options
 * @param {*} callback
 * @returns
 */
export const ReactAsyncApollo = async (Query, options, callback) => {
   let defaultOptions = { errorPolicy: "all" };
   if (Query === 'client') return options(client);
   let fetch;
   let { type: TYPE } = options;
   if (!TYPE) return Promise.reject({ status: "ERROR", message: "type is required" });

   let type = TYPE.toLowerCase();

   if (TYPE.toLowerCase() !== mutation && TYPE.toLowerCase() !== query) return Promise.reject({ status: "ERROR", message: `type must 'mutation' / 'query'` })

   if (type === mutation) {
      delete options.type;
      fetch = client.mutate({ mutation: Query, variables: options.variables, ...defaultOptions })
   } else if (type === query) {
      delete options.type;
      fetch = client.query({ query: Query, ...options, ...defaultOptions });
   };

   let { data, errors } = await fetch;

   if (data) {
      if (callback) return callback(null, data);
      return Promise.resolve(data);
   } else if (errors) {
      if (callback) return callback(errors, null);
      return Promise.reject(errors)
   }
};