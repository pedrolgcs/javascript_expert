const path = require('path');
const sinon = require('sinon');
const { expect } = require('chai');
const { describe, it, before, beforeEach, afterEach } = require('mocha');
const CarService = require('../../src/services/carService');
const Transaction = require('../../src/entities/transaction');

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

  it('should be able to calculate final amount in real', async () => {
    const customer = Object.create(MOCKS.customer);
    customer.age = 50;
    const carCategory = Object.create(MOCKS.carCategory);
    carCategory.price = 37.6;
    const numberOfDays = 5;
    const expected = carService.currencyFormat.format(244.4);

    sandbox
      .stub(carService, 'taxesBaseOnAge')
      .get(() => [{ from: 40, to: 50, then: 1.3 }]);

    const sut = carService.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    expect(sut).to.be.equal(expected);
  });

  it('should be able to given a car and a car category and return transaction', async () => {
    const car = Object.create(MOCKS.car);
    const customer = {
      ...MOCKS.customer,
      age: 20,
    };
    const carCategory = {
      ...MOCKS.carCategory,
      price: 37.6,
      carIds: [car.id],
    };
    const numberOfDays = 5;
    const mockNow = new Date(2020, 10, 5);

    sandbox.useFakeTimers(mockNow.getTime());
    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    const expectedAmount = carService.currencyFormat.format(206.8);
    const expected = new Transaction({
      customer,
      car,
      dueDate: '10 de novembro de 2020',
      amount: expectedAmount,
    });

    const sut = await carService.rent(customer, carCategory, numberOfDays);

    expect(sut).to.be.deep.equal(expected);
  });
});
