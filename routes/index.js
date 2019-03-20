const router = require('../core/routeBuilder');

const auth = () => console.log('AUTH MIDDLEWARE');
const currentUser = () => console.log('CURRENT USER MIDDLEWARE');

let userRoutes = router
  .withMiddlewares(auth, currentUser)
  .get('/', (req, res) => res.resolve(res.json({ appName: "NodeJs raw api." }, 200)))
  .get('/test', (req, res) => res.resolve(res.json({ test: "Working!" }, 200)))
  .register();
  
const routes = Object.assign({}, userRoutes);

module.exports = routes;