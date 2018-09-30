const util = require('util');

module.exports = function log(loggeable) {
  const method = loggeable instanceof Error ? 'stderr' : 'stdout';
  // Do not log validation errors
  if (method === 'stderr' && loggeable.statusCode === 422) {
    return;
  }

  return process[method].write(util.inspect(loggeable) + '\n');
};