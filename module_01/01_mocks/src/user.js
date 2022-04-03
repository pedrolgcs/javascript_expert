class User {
  id;
  name;
  profession;
  age;

  constructor({ id, name, profession, age }) {
    this.id = parseInt(id);
    this.name = name;
    this.profession = profession;
    this.age = parseInt(age);
  }

  getUser() {
    return {
      id: this.id,
      name: this.name,
      profession: this.profession,
      age: this.age,
    };
  }
}

module.exports = User;
