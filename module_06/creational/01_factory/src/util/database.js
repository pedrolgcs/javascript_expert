class Database {
  connectionString;

  constructor({ connectionString }) {
    this.connectionString = connectionString;
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async connect() {
    await this.sleep(100);
    return this;
  }

  async find(query) {
    await this.sleep(500);
    return [{ name: 'Pedro Henrique' }];
  }
}

module.exports = Database;
