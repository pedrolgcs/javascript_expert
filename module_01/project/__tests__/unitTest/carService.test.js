const path = require('path');
const sinon = require('sinon');
const { expect } = require('chai');
const { describe, it, before, beforeEach, afterEach } = require('mocha');
const CarService = require('../../src/services/carService');

const CARS_DATABASE = path.join(
  __dirname,
  '../../src/infra/database/cars.json'
);

const MOCKS = {
  car: require('../mocks/car.json'),
  carCategory: require('../mocks/carCategory.json'),
  customer: require('../mocks/customer.json'),
};

describe('CarService', () => {
  let carService = {};
  let sandbox = {};

  before(() => {
    carService = new CarService({ cars: CARS_DATABASE });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be able to retrieve a radon position from an array', async () => {
    const data = [0, 1, 2, 3, 4];

    const sut = carService.getRandomPositionFromArray(data);

    expect(sut).to.be.lte(data.length).and.be.gte(0);
  });

  it('should be able to choose ths first id from carIds in carCategory', async () => {
    const carCategory = MOCKS.carCategory;
    const carIdIndex = 0;
    const expected = carCategory.carIds[carIdIndex];

    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIdIndex);

    const sut = carService.chooseRandomCar(carCategory);

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(sut).to.be.equal(expected);
  });

  it('should be able to given a car category and return an available car', async () => {
    const car = MOCKS.car;
    const carCategory = Object.create(MOCKS.carCategory);
    carCategory.carIds = [car.id];
    const expected = car;

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    sandbox.spy(carService, carService.chooseRandomCar.name);

    const sut = await carService.getAvailableCar(carCategory);

    expect(sut).to.be.deep.equal(expected);
    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;
  });
});
