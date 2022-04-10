const assert = require('assert');

const obj = {};
const arr = [];
const fn = () => {};

assert.deepStrictEqual(new Object().__proto__, obj.__proto__);
assert.deepStrictEqual(Object.prototype, obj.__proto__);

assert.deepStrictEqual(arr.__proto__, Array.prototype);

assert.deepStrictEqual(fn.__proto__, Function.prototype);

// ----------------------------------------

function Employer() {}
Employer.prototype.salary = () => 'salary**';

function Supervisor() {}
Supervisor.prototype = Object.create(Employer.prototype);
Supervisor.prototype.profitShare = () => 'profitShare';

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses';

const manager = new Manager();

assert.deepStrictEqual(manager.__proto__, Manager.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__,
  Employer.prototype
);

// ----------------------------------------

class T1 {
  ping() {
    return 'ping';
  }
}

class T2 extends T1 {
  pong() {
    return 'pong';
  }
}

class T3 extends T2 {
  shoot() {
    return 'shoot';
  }
}

const t3 = new T3();

assert.deepStrictEqual(t3.__proto__, T3.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
