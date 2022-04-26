const assert = require('assert');

const myMap = new Map();

myMap
  .set(1, 'one')
  .set('Erick', 'Wendel')
  .set(true, () => 'Hello');

const myMapWithConstructor = new Map([
  ['Erick', 'Wendel'],
  [1, 'one'],
  [2, 'two'],
]);

assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMapWithConstructor.get('Erick'), 'Wendel');
assert.ok(myMap.delete(1));

// ---------------------------------------------------------------
const myWeakMap = new WeakMap();

const key = {};

const hero = {
  name: 'Pedro',
  power: 'code',
}

myWeakMap.set(key, hero);
assert.deepStrictEqual(myWeakMap.get(key), hero);
assert.ok(myWeakMap.has(key));
assert.ok(myWeakMap.delete(key));