// const log = require('./log');
function error(response) {
  return (error) => {
    // log(error);
    if (error && error instanceof Error) {
      response.statusCode = error.status || 500;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify({
        error: String(error.message || 'Internal Server Error')
      }));
      response.end();
      return true;
    }
    return false;
  }
}

module.exports = error;