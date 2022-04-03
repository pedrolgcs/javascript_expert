const http = require('http');

const DEFAULT_USER = {
  username: 'pedro',
  password: '123',
};

const PORT = 3000;

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page');
    return response.end();
  },

  '/login:post': async (request, response) => {
    for await (const data of request) {
      const user = JSON.parse(data);

      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        response.writeHead(401);
        response.write('Logging failed');
        return response.end();
      }
    }

    response.write('Logging has succeeded');
    return response.end();
  },

  default: (_, response) => {
    response.write('hello world');
    return response.end();
  },
};

const handler = function (request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;

  // default header
  response.writeHead(200, { 'Content-Type': 'text/html' });

  return chosen(request, response);
};

const app = http
  .createServer(handler)
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };
