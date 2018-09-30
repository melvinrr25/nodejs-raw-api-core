function routeBuilder() {
  let routes = [];

  function build(method) {
    return function internal(path, ...args) {
      if (path[0] === '/') {
        path = path.substring(1, path.length);
      }
      const route = {};
      route[method + '|' + path] = args;
      routes.push(route);
      return this;
    };
  }

  function register() {
    let result = {};
    routes.forEach(route => {
      result = Object.assign({}, result, route);
    });
    return result;
  }

  return {
    get: build('GET'),
    post: build('POST'),
    put: build('PUT'),
    patch: build('PATCH'),
    delete: build('DELETE'),
    register: register
  }
}

module.exports = routeBuilder();