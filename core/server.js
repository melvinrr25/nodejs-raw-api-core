'use strict';

const setupRouter = require('./router');
const cors = require('./cors');
const parseBody = require('./parseBody');
const parseURL = require('./parseURL');
const routes = require('../routes');

module.exports = server;

function server(request, response) {
  let body = [];
  // Cors verification
  if (cors(request, response)) {
    return;
  }

  request.on('error', error).on('data', requestData).on('end', requestEnd);

  function requestData(chunk) {
    body.push(chunk);
  }

  function requestEnd() {
    const parsedURL = parseURL(request.url);
    const bodyContent = Buffer.concat(body).toString();
    request.body = parseBody(bodyContent);
    request.queryParams = parsedURL.query;
    request.reqPath = parsedURL.pathname;
    response.on('error', error);
    // API handlers logic
    setupRouter(request, response, routes);
  }

  function error(err) {
    console.error(err);
  }
}