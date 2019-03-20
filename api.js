const runServer = require('./core/runServer');

runServer({
  port: 3000,
  useDatabase: false
});