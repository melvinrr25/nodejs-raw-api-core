'use strict';

function json(response) {
  return (responseData = {}) => {
    const code = responseData.code || 200;
    const data = responseData.data || {};
    response.statusCode = code;
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify({
      data: data,
      statusCode: code
    }));
    response.end();
    return true;
  }
}

module.exports = json;