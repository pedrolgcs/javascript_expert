class Transaction {
  customer;
  car;
  amount;
  dueDate;

  constructor({ customer, car, amount, dueDate }) {
    this.customer = customer;
    this.car = car;
    this.amount = amount;
    this.dueDate = dueDate;
  }
}

module.exports = Transaction;
