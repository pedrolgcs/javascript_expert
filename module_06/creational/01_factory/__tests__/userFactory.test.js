const rewiremock = require('rewiremock/node');
const { deepStrictEqual } = require('assert');

const dbData = [{ name: 'Pedro' }, { name: 'Jack' }];
class MockDatabase {
  connect = () => this;
  find = async (query) => dbData;
}

rewiremock(() => require('../src/util/database')).with(MockDatabase);

(async () => {
  {
    const expected = [{ name: 'PEDRO' }, { name: 'JACK' }];
    rewiremock.enable();
    const { UserFactory } = require('../src/factory/userFactory');

    const userFactory = await UserFactory.createInstance();
    const sut = await userFactory.find();
    deepStrictEqual(sut, expected);
    rewiremock.disable();
  }

  {
    const expected = [{ name: 'PEDRO HENRIQUE' }];
    const { UserFactory } = require('../src/factory/userFactory');
    const userFactory = await UserFactory.createInstance();
    const sut = await userFactory.find();
    deepStrictEqual(sut, expected);
  }
})();
