const builder = require('../core/routeBuilder');

let userRoutes = builder
  .get('/test/:id/dog3/:id2', (req, res) => res.resolve(res.json(req.params)))
  .get('/:id', (req, res) => res.resolve(res.json(req.params)))
  .get('/test', (req, res) => res.resolve(res.json("req.params")))
  .post('/test/:testId/dog3/:id', (req, res) => console.log('POST', '/test/:testId/dog3/:id'))
  .put('/test/:testId/dog3/:id', (req, res) => console.log('PUT', '/test/:testId/dog3/:id'))
  .register();

const routes = Object.assign({}, userRoutes);

module.exports = routes;