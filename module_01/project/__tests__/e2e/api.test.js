const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');
const { app } = require('../../src/infra/http/server');
const CarService = require('../../src/services/carService');

const MOCKS = {
  car: require('../mocks/car.json'),
  customer: require('../mocks/customer.json'),
  carCategory: require('../mocks/carCategory.json'),
};

describe('Api suit test', () => {
  describe('/nonexistent', () => {
    it('should be able to return a 404 status code in non existing route', async () => {
      const expectedStatusCode = 404;
      const expectedBody = {
        error: 'page not found',
      };

      const sut = await supertest(app).get('/nonexistent');
      expect(sut.status).to.be.equal(expectedStatusCode);
      expect(sut.body).to.be.deep.equal(expectedBody);
    });
  });

  describe('/car/rent', () => {
    let sandbox = {};

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should be able to create a rent', async () => {
      const car = { ...MOCKS.car };
      const carCategory = {
        ...MOCKS.carCategory,
        carIds: [car.id],
      };
      const customer = { ...MOCKS.customer };
      const mockNow = new Date(2020, 10, 5);

      const expected = {
        customer: MOCKS.customer,
        car: car,
        amount: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(473.39),
        dueDate: '10 de novembro de 2020',
      };

      sandbox.useFakeTimers(mockNow.getTime());

      /*
      ? create a stub or mock with only id in car category
      sandbox
        .stub(CarService.prototype, CarService.prototype.getAvailableCar.name)
        .returns(MOCKS.car);
      */

      const sut = await supertest(app).post('/car/rent').send({
        customer: customer,
        category: carCategory,
        numberOfDays: 5,
      });

      expect(sut.status).to.be.equal(201);
      expect(sut.body).to.be.deep.equal(expected);
    });
  });
});
