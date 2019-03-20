const tap = require('tap');
const server = require('../../core/server');
const fake = require('../reqRes');

const table = [{
  req: fake.requestObj({
    method: 'OPTIONS'
  }),
  res: fake.responseObj(),
  out: undefined
}, {
  req: fake.requestObj(),
  res: fake.responseObj(),
  out: undefined
}];

function each(item) {
  const actual = server({})(item.req, item.res);
  tap.deepEqual(actual, item.out);
}

table.map(each);