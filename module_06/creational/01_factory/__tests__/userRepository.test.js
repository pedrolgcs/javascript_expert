const { deepStrictEqual } = require('assert');
const { UserRepository } = require('../src/repository/userRepository');

const dbData = [{ name: 'Pedro Henrique' }];
class MockDatabase {
  connect = () => this;
  find = async (query) => dbData;
}

(async () => {
  {
    const expected = [{ name: 'Pedro Henrique' }];

    const userRepository = new UserRepository({
      dbConnection: new MockDatabase(),
    });

    const sut = await userRepository.find('SELECT * FROM users');

    deepStrictEqual(sut, expected);
  }
})();
