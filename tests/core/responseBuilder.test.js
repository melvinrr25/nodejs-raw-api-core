const tap = require('tap');
const responseBuilder = require('../../core/responseBuilder');

const table = [{
  data: {},
  code: 400,
  out: {
    data: {},
    code: 400
  },
}, {
  data: undefined,
  code: undefined,
  out: {
    data: {},
    code: 200
  },
}];

function each(item) {
  const actual = responseBuilder(item.data, item.code);
  tap.equivalent(actual, item.out);
}

table.map(each);