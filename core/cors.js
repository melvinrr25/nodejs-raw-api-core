function cors(request, response) {
  const methods = 'OPTIONS, GET, PUT, POST, PATCH, DELETE';
  const headers = 'Content-Type, Authorization, Cache-Control, X-Requested-With';

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', methods);
  response.setHeader('Access-Control-Allow-Headers', headers);

  if (request.method.toUpperCase() === 'OPTIONS') {
    response.end();
    return true;
  }
  return false;
}

module.exports = cors;