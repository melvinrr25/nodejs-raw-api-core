const tap = require('tap');
const cors = require('../../core/cors');
const fake = require('../reqRes');

const table = [{
  req: fake.requestObj(),
  res: fake.responseObj(),
  out: false
}, {
  req: fake.requestObj({method: 'GET'}),
  res: fake.responseObj(),
  out: false
}, {
  req: fake.requestObj({method: 'POST'}),
  res: fake.responseObj(),
  out: false
}, {
  req: fake.requestObj({method: 'PUT'}),
  res: fake.responseObj(),
  out: false
}, {
  req: fake.requestObj({method: 'PATCH'}),
  res: fake.responseObj(),
  out: false
}, {
  req: fake.requestObj({method: 'DELETE'}),
  res: fake.responseObj(),
  out: false
}, {
  req: fake.requestObj({method: 'OPTIONS'}),
  res: fake.responseObj(),
  out: true
}];

function each(item) {
  const actual = cors(item.req, item.res);
  tap.deepEqual(actual, item.out);
}

table.map(each);