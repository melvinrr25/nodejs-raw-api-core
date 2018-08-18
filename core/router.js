'use strict';

const json = require('./json');
const responseBuilder = require('./responseBuilder');
const errorHandler = require('./error');
const log = require('./log');
const resolve = require('./resolve');
const fn = () => {};

function router(request, response, routes) {
  response.resolve = resolve;
  response.json = responseBuilder;

  const methodPath = request.method.toUpperCase() + ' ' + request.reqPath;
  const handlersChain = routes[methodPath];

  if (handlersChain) {
    let resolvedWithError = false;
    let responseOccured = false;
    const handlersList = flattenDeep(handlersChain);
    // Workaround to resolve last handler in the chain
    handlersList.push(fn);
    handlersList.reduce((promise, handler) => {
      return promise
        .then(result => {
          if (result instanceof Error) {
            resolvedWithError = true;
            throw result;
          }
          // if (result && result.data && result.code) { // // stop handlers from going on and on 
          if (result && result.data && result.code && !responseOccured) {
            json(response)(result);
            responseOccured = true;
          }
          // if (!resolvedWithError && !responseOccured) { // stop handlers from going on and on
          if (!resolvedWithError) {
            return handler(request, response)
          }
        })
        .catch(error => errorHandler(response)(error));
    }, Promise.resolve([]));
  } else {
    const error = Error('Not Found')
    error.status = 404;
    errorHandler(response)(error)
  }
}

function flattenDeep(array) {
  return array.reduce((acc, val) => {
    return Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val);
  }, []);
}

module.exports = router;