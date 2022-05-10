const { deepStrictEqual } = require('assert');
const { UserService } = require('../src/service/userService');

class FakeRepository {
  find(query) {
    return [{ name: 'Pedro Henrique' }];
  }
}

(async () => {
  {
    const expected = [{ name: 'PEDRO HENRIQUE' }];

    const userService = new UserService({
      userRepository: new FakeRepository(),
    });

    const sut = await userService.find('name:pedro');

    deepStrictEqual(sut, expected);
  }
})();
