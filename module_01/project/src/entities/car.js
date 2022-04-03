const Base = require('./base');

class Car extends Base {
  releaseYear;
  available;
  gasAvailable;

  constructor({ id, name, releaseYear, available, gasAvailable }) {
    super({ id, name });
    this.releaseYear = releaseYear;
    this.available = available;
    this.gasAvailable = gasAvailable;
  }
}

module.exports = Car;
