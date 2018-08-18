const tap = require('tap');
const error = require('../../core/error');
const fake = require('../reqRes');

const table = [{
  res: fake.responseObj(),
  error: () => {
    const error = Error('Unauthorized')
    error.status = 401;
    return error;
  },
  out: true
}, {
  res: fake.responseObj(),
  error: () => Error(),
  out: true
}, {
  res: fake.responseObj(),
  error: () => true,
  out: false
}];

function each(item) {
  const actual = error(item.res)(item.error());
  tap.deepEqual(actual, item.out);
}

table.map(each);