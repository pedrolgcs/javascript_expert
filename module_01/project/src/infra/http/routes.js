const path = require('path');
const CarService = require('../../services/carService');

const CARS_DATABASE = path.join(__dirname, '../database/cars.json');

const carService = new CarService({
  cars: CARS_DATABASE,
});

const routes = {
  '/car/rent:POST': async (request, response) => {
    let body = {};

    for await (const data of request) {
      body = JSON.parse(data);
    }

    const { customer, category, numberOfDays } = body;

    const result = await carService.rent(customer, category, numberOfDays);

    response.writeHead(201, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify(result));
  },

  default: (_, response) => {
    response.write('page not found');
    response.writeHead(404);
    return response.end();
  },
};

module.exports = { routes };
