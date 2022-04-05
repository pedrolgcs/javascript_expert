const http = require('http');
const { routes } = require('./routes');

const handler = function (request, response) {
  const { url, method } = request;
  const routerKey = `${url}:${method}`;
  console.log(routerKey);
  const chosenRoute = routes[routerKey] || routes.default;

  return chosenRoute(request, response);
};

const PORT = 3000;

const app = http
  .createServer(handler)
  .listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = { app };
