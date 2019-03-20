const tap = require('tap');
const runServer = require('../../core/runServer');
const fake = require('../reqRes');

const table = [{
  in: {
    port: 30001,
    useDatabase: false,
    test: true,
  },
  out: undefined
}];

function each(item) {
  const actual = runServer(item.in);
  tap.deepEqual(actual, item.out);
}

table.map(each);