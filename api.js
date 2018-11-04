const runServer = require('./core/runServer');

runServer({
  port: 8080,
  useDatabase: false
});