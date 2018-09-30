const tap = require('tap');
const getRouteData = require('../../core/getRouteData');
const builder = require('../../core/routeBuilder');
const fn = () => null;

let testRoutes = builder
  .get('test/:id', fn)
  .get('report/:id/date/:date', fn)
  .get('/test/test2/test3', [fn])
  .get('ping', fn)
  .post('test/:id', fn)
  .put('test/:id', fn)
  .delete('test/:id', fn, fn)
  .register();

const table = [{
  routes: testRoutes,
  reqMethod: 'GET',
  reqPath: '/test/10',
  out: {
    isMatching: true,
    route: 'test/:id',
    params: {
      id: '10'
    },
    handlers: [fn]
  }
}, {
  routes: testRoutes,
  reqMethod: 'DELETE',
  reqPath: 'test/22',
  out: {
    isMatching: true,
    route: 'test/:id',
    params: {
      id: '22'
    },
    handlers: [fn, fn]
  }
}, {
  routes: testRoutes,
  reqMethod: 'GET',
  reqPath: '/report/12345/date/2018-08-01',
  out: {
    isMatching: true,
    route: 'report/:id/date/:date',
    params: {
      id: '12345',
      date: '2018-08-01',
    },
    handlers: [fn]
  }
}, {
  routes: testRoutes,
  reqMethod: 'POST',
  reqPath: 'test/1?auth=true',
  out: {
    isMatching: true,
    route: 'test/:id',
    params: {
      id: '1'
    },
    handlers: [fn]
  }
}, {
  routes: testRoutes,
  reqMethod: 'POST',
  reqPath: 'test2/1',
  out: {
    isMatching: false,
    route: null,
    params: {},
    handlers: []
  }
}, {
  routes: testRoutes,
  reqMethod: 'GET',
  reqPath: 'ping',
  out: {
    isMatching: true,
    route: 'ping',
    params: {},
    handlers: [fn]
  }
},  {
  routes: testRoutes,
  reqMethod: 'GET',
  reqPath: '/test/test2/test3',
  out: {
    isMatching: true,
    route: 'test/test2/test3',
    params: {},
    handlers: [[fn]]
  }
}];

function each(item) {
  const actual = getRouteData(item.reqMethod, item.reqPath, item.routes);
  tap.equivalent(actual, item.out);
}

table.map(each);