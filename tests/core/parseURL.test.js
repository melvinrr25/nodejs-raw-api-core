const tap = require('tap');
const parseURL = require('../../core/parseURL');

const tableQuery = [{ in: 'http://test.xyz?id=10',
  method: 'query',
  out: {
    id: 10
  }
}, { in: 'http://test.xyz',
  method: 'query',
  out: {}
}];

const tablePath = [{ in: 'http://test.xyz/test?id=10',
  method: 'pathname',
  out: '/test'
}, { in: 'http://test.xyz',
  method: 'pathname',
  out: '/'
}];

function each(item) {
  const actual = parseURL(item.in)[item.method];
  tap.deepEqual(actual, item.out);
}

tableQuery.map(each);
tablePath.map(each);