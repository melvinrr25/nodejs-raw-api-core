const builder = require('../core/routeBuilder');

let userRoutes = builder
  .get('/', (req, res) => res.resolve(res.json({ appName: "NodeJs raw api." }, 200)))
  .get('/test', (req, res) => res.resolve(res.json({ test: "Working!" }, 200)))
  .register();

const routes = Object.assign({}, userRoutes);

module.exports = routes;