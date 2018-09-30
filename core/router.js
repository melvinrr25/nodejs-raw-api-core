const json = require('./json');
const responseBuilder = require('./responseBuilder');
const getRouteData = require('./getRouteData');
const errorHandler = require('./error');
const log = require('./log');
const resolve = require('./resolve');
const fn = () => {};

function router(request, response, routes) {
  const method = request.method.toUpperCase();
  const route = getRouteData(method, request.reqPath, routes);
  // Check whether or not the requested path is defined in the routes
  if (route.isMatching) {
    let resolvedWithError = false;
    let responseOccured = false;
    const handlersList = flattenDeep(route.handlers);
    request.params = route.params;
    response.resolve = resolve;
    response.json = responseBuilder;
    // Workaround to resolve last handler in the chain
    handlersList.push(fn);
    handlersList.reduce((promise, handler) => {
      return promise
        .then(result => {
          if (result instanceof Error) {
            resolvedWithError = true;
            throw result;
          }
          if (result && result.data && result.code && !responseOccured) {
            json(response)(result);
            responseOccured = true;
          }
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