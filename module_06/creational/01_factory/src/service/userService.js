class UserService {
  userRepository;

  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async find(query) {
    const users = await this.userRepository.find(query);

    const result = users.map((item) => ({
      ...item,
      name: item.name.toUpperCase(),
    }));

    return result;
  }
}

module.exports = { UserService };
