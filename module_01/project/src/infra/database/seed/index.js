const path = require('path');
const { writeFile } = require('fs/promises');
const Chance = require('chance');
const Car = require('../../../entities/car');
const Customer = require('../../../entities/customer');
const CarCategory = require('../../../entities/carCategory');

const ITEMS_AMOUNT = 2;

const seederBaseFolder = path.join(__dirname, '..');

// initialize Chance
const chance = new Chance();

const carCategory = new CarCategory({
  id: chance.guid(),
  name: chance.word(),
  carIds: [],
  price: chance.floating({ min: 20, max: 100, fixed: 2 }),
});

const cars = [];
const customers = [];

for (let index = 0; index <= ITEMS_AMOUNT; index++) {
  const car = new Car({
    id: chance.guid(),
    name: chance.word(),
    releaseYear: chance.year({ min: 2000, max: 2020 }),
    available: true,
    gasAvailable: true,
  });

  const customer = new Customer({
    id: chance.guid(),
    name: chance.name(),
    age: chance.age({ min: 18, max: 50 }),
  });

  cars.push(car);
  carCategory.carIds.push(car.id);
  customers.push(customer);
}

const write = (filename, data) => {
  return writeFile(path.join(seederBaseFolder, filename), JSON.stringify(data));
};

/* create database files */
(async () => {
  await write('cars.json', cars);
  await write('carCategories.json', [carCategory]);
  await write('customers.json', [customers]);
})();