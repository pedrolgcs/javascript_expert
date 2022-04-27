const assert = require('assert');

const arr1 = [1, 2, 3];
const arr2 = [3, 4, 5, 6];

const mySet = Array.from(new Set([...arr1, ...arr2]));

assert.deepStrictEqual(mySet, [1, 2, 3, 4, 5, 6]);
