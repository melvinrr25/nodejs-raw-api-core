const tap = require('tap');
const json = require('../../core/json');
const fake = require('../reqRes');

const table = [{
  res: fake.responseObj(),
  data: {},
  out: true
}, {
  res: fake.responseObj(),
  out: true
}];

function each(item) {
  const actual = json(item.res)(item.data);
  tap.deepEqual(actual, item.out);
}

table.map(each);