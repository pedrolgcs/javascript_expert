const { evaluateRegex } = require('./util');

// TODO: Move to utils folder
const formatFirstLetter = (text) => {
  const regex = evaluateRegex(/^(\w{1})([a-z|A-Z]+$)/g);
  return text.replace(regex, (fullMatch, group1, group2) => {
    return `${group1.toUpperCase()}${group2.toLowerCase()}`;
  });
};

const formatDocument = (text) => {
  const regex = evaluateRegex(/\D/g);
  return text.replace(regex, '');
};

const formatStreet = (text) => {
  const regex = evaluateRegex(/(?<=\sa\s).*$/);
  return text.match(regex).join();
};

const formatNeighborhood = (text) => {
  const regex = evaluateRegex(/(?<=\s).*$/);
  return text.match(regex).join();
};

const formatState = (text) => {
  const regex = evaluateRegex(/\.$/);
  return text.replace(regex, '');
};

class Person {
  nome;
  nacionalidade;
  estadoCivil;
  documento;
  rua;
  numero;
  bairro;
  estado;

  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado,
  ]) {
    this.nome = nome;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);
    this.documento = formatDocument(documento);
    this.rua = formatStreet(rua);
    this.numero = numero;
    this.bairro = formatNeighborhood(bairro);
    this.estado = formatState(estado);
  }
}

module.exports = Person;
