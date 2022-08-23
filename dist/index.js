"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncApollo = exports.InitProvider = void 0;

require("core-js/modules/es.promise.js");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let client;
let mutation = "mutation";
let query = "query";
/**
 *
 * @param {*} newClient
 * @returns
 */

const InitClient = newClient => {
  return client = newClient;
};
/**
 *
 * @param {*} param0
 * @returns
 */


const InitProvider = _ref => {
  let {
    client: newClient,
    children
  } = _ref;
  InitClient(newClient);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children);
};
/**
 *
 * @param {*} Query
 * @param {*} options
 * @param {*} callback
 * @returns
 */


exports.InitProvider = InitProvider;

const AsyncApollo = async (Query, options, callback) => {
  let defaultOptions = {
    errorPolicy: "all"
  };
  if (Query === 'client') return options(client);
  let fetch;
  let {
    type: TYPE
  } = options;
  if (!TYPE) return Promise.reject({
    status: "ERROR",
    message: "type is required"
  });
  let type = TYPE.toLowerCase();
  if (TYPE.toLowerCase() !== mutation && TYPE.toLowerCase() !== query) return Promise.reject({
    status: "ERROR",
    message: "type must 'mutation' / 'query'"
  });

  if (type === mutation) {
    delete options.type;
    fetch = client.mutate(_objectSpread({
      mutation: Query,
      variables: options.variables
    }, defaultOptions));
  } else if (type === query) {
    delete options.type;
    fetch = client.query(_objectSpread(_objectSpread({
      query: Query
    }, options), defaultOptions));
  }

  ;
  let {
    data,
    errors
  } = await fetch;

  if (data) {
    if (callback) return callback(null, data);
    return Promise.resolve(data);
  } else if (errors) {
    if (callback) return callback(errors, null);
    return Promise.reject(errors);
  }
};

exports.AsyncApollo = AsyncApollo;