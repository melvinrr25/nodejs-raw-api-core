const tap = require('tap');
const router = require('../../core/router');
const fake = require('../reqRes');

const error = Error('Fatal error');
error.status = 500;

const table = [{
  req: fake.requestObj({
    reqPath: '/test',
    method: 'GET'
  }),
  res: fake.responseObj(),
  routes: {
    'GET|test': [
      (req, res) => res.resolve(),
      (req, res) => res.resolve(res.json(undefined, undefined)), [
        (req, res) => res.resolve(error)
      ]
    ]
  },
  out: undefined
}];

function each(item) {
  const actual = router(item.req, item.res, item.routes);
  tap.deepEqual(actual, item.out);
}

table.map(each);