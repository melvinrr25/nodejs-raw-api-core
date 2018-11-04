const builder = require('../core/routeBuilder');

let userRoutes = builder
  .get('/', (req, res) => res.resolve(res.json({ appName: "NodeJs raw api." })))
  .register();

const routes = Object.assign({}, userRoutes);

module.exports = routes;