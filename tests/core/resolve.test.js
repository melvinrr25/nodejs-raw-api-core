const tap = require('tap');
const resolve = require('../../core/resolve');

const table = [{ in: 'test',
  out: 'test',
  type: '=='
}, { in: 'test1',
  out: 'test2',
  type: '!='
}];

function each(item) {
  const promise = resolve(item.in);
  promise.then(result => {
    if (item.type === '==') {
      tap.deepEqual(result, item.out);
    } else {
      tap.notEqual(result, item.out);
    }
  });
}

table.map(each);