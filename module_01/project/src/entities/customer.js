const Base = require('./base');

class Customer extends Base {
  age;

  constructor({ id, name, age }) {
    super({ id, name });
    this.age = age;
  }
}

module.exports = Customer;
