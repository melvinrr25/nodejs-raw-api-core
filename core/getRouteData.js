'use strict';

function getSplitUrl(url) {
  return url.split('/');
}

function getSplitRoutes(routes) {
  let eachRoute = r => {
    if (r[0] === '/') {
      return r.substring(1, r.length).split('/');
    }
    return r.split('/');
  };
  return routes.map(eachRoute);
}

function prepareUrl(url) {
  if (url[0] === '/') {
    url = url.substring(1, url.length);
  }

  let idx = url.indexOf('?');

  if (idx >= 0) {
    url = url.substring(0, idx);
  }

  return url;
}

function byThoseMatchingLenght(splitUrl) {
  return r => r.length === splitUrl.length;
}

function byRouteElementMatching(splitUrl) {
  return (routePart, i) => {
    if (routePart === splitUrl[i] || routePart.indexOf(':') >= 0) {
      return true;
    }
    return false;
  }
}

function uniqRoute(splitUrl) {
  return route => {
    let results = route.map(byRouteElementMatching(splitUrl));
    if (results.indexOf(false) === -1) {
      return route;
    }
  }
}

function uniqRoutesList(array) {
  return array.filter((value, index, self) => self.indexOf(value) === index);
}

function mapParams(splitUrl, route) {
  let params = {};
  route.forEach((routeEntry, i) => {
    if (routeEntry.indexOf(':') >= 0) {
      params[routeEntry.substring(1, routeEntry.length)] = splitUrl[i]
    }
  });
  return params;
}

function separateMethodFromRoutes(routes) {
  return Object.keys(routes).map(key => {
    let idx = key.indexOf('|');
    return key.substring(idx + 1, key.length);
  });
}

function buildRouteData(method, route, userRoutes, splitUrl) {
  if (!route) {
    return {
      isMatching: false,
      route: null,
      params: {},
      handlers: []
    }
  }

  let originalRoute = route.join('/');
  let routeKey = method + '|' + originalRoute;
  let handlers = userRoutes[routeKey];

  return {
    isMatching: true,
    route: originalRoute,
    params: mapParams(splitUrl, route),
    handlers: handlers,
  }
}

function getRouteData(method, requestPath, userRoutes) {
  let routes = separateMethodFromRoutes(userRoutes);
  let splitRoutes = getSplitRoutes(uniqRoutesList(routes));
  let url = prepareUrl(requestPath);
  let splitUrl = getSplitUrl(url);
  let route = splitRoutes
    .filter(byThoseMatchingLenght(splitUrl))
    .find(uniqRoute(splitUrl));
  return buildRouteData(method, route, userRoutes, splitUrl);
}

module.exports = getRouteData;