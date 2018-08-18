const fn = () => null;
const resolve = require('../core/resolve');

const responseObj = () => ({
  setHeader: fn,
  end: fn,
  write: fn,
  statusCode: null,
  resolve: resolve,
  json: fn,
  on: fn
});

const requestObj = (args = {}) => ({
  method: args.method || 'GET',
  url: args.url || '/',
  reqPath: args.reqPath || '/',
  body: args.body || null,
  headers: args.headers || {
    authorization: 12345
  },
  on: function(event, fn) {
    fn(new Buffer(0));
    return this;
  }
});

module.exports = {
  requestObj,
  responseObj
}