const { evaluateRegex } = require('./util');

class TextProcessorFluentAPI {
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    /*
      ?<= fala que vai extrair os dados que virão depois
      [contratante|contratante] ou um ou outro
      :\s{1} vai procurar os : seguindo de um espaço
      tudo fica dentro de um grupo

      (?!s) negative look around, vai ignorar os contrantes no fim do documento
      .*\n vai pegar tudo até a quebra de linha
      .*? faz com que pare na primeira recorrência
    */
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
      line.map((item) => item.replace(regexEmptyCharacters, ''))
    );

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
