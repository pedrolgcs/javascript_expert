'use strict';
const assert = require('assert');

(() => {
  const myObjc = {
    add(myValue) {
      return this.arg1 + this.arg2 + myValue;
    },
  };

  assert.deepStrictEqual(myObjc.add.apply({ arg1: 1, arg2: 2 }, [3]), 6);

  myObjc.add.apply = function () {
    throw new TypeError('apply is not allowed');
  };

  assert.throws(() => myObjc.add.apply({ arg1: 1, arg2: 2 }, [3]), {
    name: 'TypeError',
    message: 'apply is not allowed',
  });
})();

// --------------------------------------------------------------
(() => {
  const myObjc = {
    add(myValue) {
      return this.arg1 + this.arg2 + myValue;
    },
  };

  const reflect = Reflect.apply(myObjc.add, { arg1: 10, arg2: 20 }, [30]);

  assert.deepStrictEqual(reflect, 60);
})();

// --------------------------------------------------------------
(() => {
  function MyDate() {}

  Reflect.defineProperty(MyDate, 'withReflect', { value: () => 'Hey' });

  assert.deepStrictEqual(MyDate.withReflect(), 'Hey');
})();

// --------------------------------------------------------------
(() => {
  const withDelete = {
    name: 'Pedro',
    email: 'pedro@gmail.com',
    age: 30,
  };
  delete withDelete.name;
  assert.deepStrictEqual(withDelete.hasOwnProperty('name'), false);

  const withReflect = {
    name: 'Pedro',
    email: 'pedro@gmail.com',
    age: 30,
  };
  Reflect.deleteProperty(withReflect, 'name');
  assert.deepStrictEqual(withReflect.hasOwnProperty('name'), false);
})();

(() => {
  const myObj = {
    name: 'Pedro',
    age: 30,
  };

  assert.deepStrictEqual(Reflect.get(myObj, 'name'), 'Pedro');
  assert.ok(Reflect.has(myObj, 'name'));
})();

// --------------------------------------------------------------

(() => {
  const user = Symbol('user');

  const myObj = {
    id: 1,
    [Symbol.for('pasword')]: 123,
    [user]: 'Pedro',
  };

  const objectKeys = [
    ...Object.getOwnPropertyNames(myObj),
    ...Object.getOwnPropertySymbols(myObj),
  ];

  assert.deepStrictEqual(objectKeys, ['id', Symbol.for('pasword'), user]);

  assert.deepStrictEqual(Reflect.ownKeys(myObj), [
    'id',
    Symbol.for('pasword'),
    user,
  ]);
})();
