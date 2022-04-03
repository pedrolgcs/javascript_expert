const sinon = require('sinon');
const { deepStrictEqual } = require('assert');
const Service = require('../service');
const mockAlderaan = require('../mocks/alderaan');
const mockTatooine = require('../mocks/tatooine');

const BASE_URL_PLANET_01 = 'https://swapi.dev/api/planets/1';
const BASE_URL_PLANET_02 = 'https://swapi.dev/api/planets/2';

const MOCKS = {
  tatooine: mockTatooine,
  alderaan: mockAlderaan,
};

(async () => {
  {
    /* // ! Go to internet
    const service = new Service();
    const response = await service.makeRequest(BASE_URL_PLANET_02);
    console.log(JSON.stringify(response));
    */
  }

  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);
  stub.withArgs(BASE_URL_PLANET_01).resolves(MOCKS.tatooine);
  stub.withArgs(BASE_URL_PLANET_02).resolves(MOCKS.alderaan);

  {
    const expected = {
      name: 'Tatooine',
      surfaceWater: '1',
      appearsIn: 5,
    };

    const sut = await service.getPlanets(BASE_URL_PLANET_01);

    deepStrictEqual(sut, expected);
  }

  {
    const expected = {
      name: 'Alderaan',
      surfaceWater: '40',
      appearsIn: 2,
    };

    const sut = await service.getPlanets(BASE_URL_PLANET_02);

    deepStrictEqual(sut, expected);
  }
})();
