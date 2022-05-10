const Database = require('../util/database');
const { UserRepository } = require('../repository/userRepository');
const { UserService } = require('../service/userService');

class UserFactory {
  static async createInstance() {
    const db = new Database({
      connectionString: 'mongodb://localhost:27017/db',
    });

    const dbConnection = await db.connect();

    const userRepository = new UserRepository({ dbConnection });

    const userService = new UserService({ userRepository });

    return userService;
  }
}

module.exports = { UserFactory };
