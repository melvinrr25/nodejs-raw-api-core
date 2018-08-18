const tap = require('tap');
const parseBody = require('../../core/parseBody');

const table = [{
  in: "{\"a\": 1}",
  out: {"a": 1}
}, {
  in: "{}",
  out: {}
}, {
  in: "[]",
  out: []
}, {
  in: "bWVsdmlu",
  out: "bWVsdmlu"
}, {
  out: []
}];

function each(item) {
  const actual = parseBody(item.in);
  tap.deepEqual(actual, item.out);
}

table.map(each);