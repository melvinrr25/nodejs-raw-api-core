const runServer = require('./core/runServer');
const routes = require('./routes');

runServer({
  routes: routes,
  port: 3000,
  useDatabase: false
});