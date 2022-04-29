class TextProcessorFluentAPI {
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    const matchPerson =
      /(?<=[Contratante|Contratada]:\s{1})(?!\s)(.*\n.*?)$/gim;
    const onlyPersons = this.#content.match(matchPerson);

    this.#content = onlyPersons;

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
