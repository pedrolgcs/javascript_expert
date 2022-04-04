const BaseRepository = require('../repositories/baseRepository');
const Tax = require('../entities/tax');
const Transaction = require('../entities/transaction');

class CarService {
  carRepository;
  currencyFormat;
  taxesBaseOnAge;

  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
    this.taxesBaseOnAge = Tax.taxesBaseOnAge;
    this.currencyFormat = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;
    return Math.floor(Math.random() * listLength);
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    return carCategory.carIds[randomCarIndex];
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carRepository.find(carId);
    return car;
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer;
    const { price } = carCategory;
    const { then: tax } = this.taxesBaseOnAge.find(
      (tax) => age >= tax.from && age <= tax.to
    );

    const finalPrice = tax * price * numberOfDays;

    return this.currencyFormat.format(finalPrice);
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory);

    const finalPrice = this.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + numberOfDays);

    const formattedDueDate = dueDate.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const transaction = new Transaction({
      customer,
      dueDate: formattedDueDate,
      car,
      amount: finalPrice,
    });

    return transaction;
  }
}

module.exports = CarService;
