const { describe, it } = require('mocha');
const { expect } = require('chai');
const Person = require('../src/person');

describe('Person', () => {
  it('should be able to generate a person instance', () => {
    const content = [
      'Pedro Henrique',
      'brasileiro',
      'casado',
      'CPF 102.519.624-40',
      'residente e domiciliada a Rua dos bobos',
      'zero',
      'bairro Alphaville',
      'São Paulo.',
    ];

    const expected = {
      nome: 'Pedro Henrique',
      nacionalidade: 'Brasileiro',
      estadoCivil: 'Casado',
      documento: '10251962440',
      rua: 'Rua dos bobos',
      numero: 'zero',
      bairro: 'Alphaville',
      estado: 'São Paulo',
    };

    const sut = new Person(content);

    expect(sut).to.be.deep.equal(expected);
  });
});
