const { deepStrictEqual } = require('assert');
const User = require('../user');

(() => {
  {
    const expect = {
      id: 1,
      name: 'Pedro',
      profession: 'developer',
      age: 30,
    };

    const sut = new User({
      id: '1',
      name: 'Pedro',
      profession: 'developer',
      age: '30',
    }).getUser();

    deepStrictEqual(sut, expect);
  }
})();
