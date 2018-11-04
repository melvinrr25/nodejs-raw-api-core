const tap = require('tap');
const routeBuilder = require('../../core/routeBuilder');

const middleware = () => null;

const table = [{ in: routeBuilder
    .get('/', middleware)
    .get('/test', middleware)
    .post('/test', [middleware, middleware, middleware, [[[middleware]]]])
    .put('/test', middleware)
    .patch('/test', [[[middleware]]])
    .delete('/test', middleware)
    .delete('/test2')
    .register(),
  out: {
    'GET|': [middleware],
    'GET|test': [middleware],
    'POST|test': [[middleware, middleware, middleware, [[[middleware]]]]],
    'PUT|test': [middleware],
    'PATCH|test': [[[[middleware]]]],
    'DELETE|test': [middleware],
    'DELETE|test2': [],
  }
}];

function each(item) {
  tap.same(item.in, item.out);
}

table.map(each);