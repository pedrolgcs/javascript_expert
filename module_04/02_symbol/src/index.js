const assert = require('assert');

// keys
const uniqueKey = Symbol('userName');
const user = {};

user['userName'] = 'value for normal objects';
user[uniqueKey] = 'value for symbol';

assert.deepStrictEqual(user.userName, 'value for normal objects');
assert.deepStrictEqual(user[uniqueKey], 'value for symbol');
assert.deepStrictEqual(user[Symbol('userName')], undefined);
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// ----------------------------------------------------------------------------
const KItems = Symbol('KItems');

class MyData {
  constructor(...args) {
    this[KItems] = args.map((arg) => new Date(...arg));
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') {
      throw new TypeError();
    }

    const items = this[KItems].map((item) => {
      return new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }).format(item);
    });

    return new Intl.ListFormat('pt-BR', {
      style: 'long',
      type: 'conjunction',
    }).format(items);
  }

  *[Symbol.iterator]() {
    for (const item of this[KItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (const item of this[KItems]) {
      await timeout(1000);
      yield item.toISOString();
    }
  }
}

const myDate = new MyData([2016, 1, 1], [2016, 1, 2]);

const expectedDates = [new Date(2016, 1, 1), new Date(2016, 1, 2)];

assert.deepStrictEqual(myDate[KItems], expectedDates);

// toPrimitive
assert.throws(() => Number(myDate), TypeError);
assert.deepStrictEqual(
  String(myDate),
  '01 de fevereiro de 2016 e 02 de fevereiro de 2016'
);

// iterator
assert.deepStrictEqual([...myDate], expectedDates);

(async () => {
  const dates = await Promise.all([...myDate]);
  assert.deepStrictEqual(dates, expectedDates);
})();

// ----------------------------------------------------------------------------
(() => {
  const password = Symbol('password');

  const myObj = {
    name: 'Pedro Henrique',
    [password]: '123456',
  };

  console.log(myObj.name);
})();
