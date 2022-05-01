const { evaluateRegex } = require('./util');
const Person = require('./person');

class TextProcessorFluentAPI {
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    const matchPerson = evaluateRegex(
      /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim
    );

    const onlyPersons = this.#content.match(matchPerson);

    this.#content = onlyPersons;

    return this;
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/);

    this.#content = this.#content.map((line) => line.split(splitRegex));

    return this;
  }

  removeEmptyCharacters() {
    const regexEmptyCharacters = evaluateRegex(/^\s+|\s+$|\n/gm);

    this.#content = this.#content.map((line) =>
      line.map((item) => {
        return item
          .replace(regexEmptyCharacters, '')
          .replace(evaluateRegex(/aa/), 'a a');
      })
    );

    return this;
  }

  mapPerson() {
    const persons = this.#content.map((line) => new Person(line));

    this.#content = persons;

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
