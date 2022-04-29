const { describe, it } = require('mocha');
const { expect } = require('chai');
const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI');
const mockText = require('./mock/text');

describe('TextProcessorFluentAPI', () => {
  it('#build', () => {
    const sut = new TextProcessorFluentAPI(mockText).build();

    expect(sut).to.deep.equal(mockText);
  });

  it('#extractPeopleData', () => {
    const sut = new TextProcessorFluentAPI(mockText)
      .extractPeopleData()
      .build();

    const expected = [
      [
        'Pedro Henrique, brasileiro, casado, CPF 102.519.624-40, residente e domiciliada',
        'a Rua dos bobos, zero, bairro Alphaville, São Paulo.',
      ].join('\n'),
      [
        'Janaina Luana, brasileira, casada, CPF 122.119.324-45, residente e domiciliada',
        'a Rua dos bobos, zero, bairro Alphaville, São Paulo.',
      ].join('\n'),
      [
        'Júlia Menezes, brasileira, solteira, CPF 123.119.324-45, residente e domiciliada',
        'a Rua dos bobos, zero, bairro Alphaville, São Paulo.',
      ].join('\n'),
    ];

    expect(sut).to.be.deep.equal(expected);
  });

  it('#divideTextInColumns', () => {
    const content = [
      [
        'Pedro Henrique, brasileiro, casado, CPF 102.519.624-40, residente e domiciliada',
        'a Rua dos bobos, zero, bairro Alphaville, São Paulo.',
      ].join('\n'),
    ];

    const sut = new TextProcessorFluentAPI(content)
      .divideTextInColumns()
      .build();

    const expected = [
      [
        'Pedro Henrique',
        ' brasileiro',
        ' casado',
        ' CPF 102.519.624-40',
        ' residente e domiciliada\na Rua dos bobos',
        ' zero',
        ' bairro Alphaville',
        ' São Paulo.',
      ],
    ];

    expect(sut).to.be.deep.equal(expected);
  });

  it('#removeEmptyCharacters', () => {
    const content = [
      [
        'Pedro Henrique',
        ' brasileiro',
        ' casado',
        ' CPF 102.519.624-40',
        ' residente e domiciliada\na Rua dos bobos',
        ' zero',
        ' bairro Alphaville',
        ' São Paulo.',
      ],
    ];

    const sut = new TextProcessorFluentAPI(content)
      .removeEmptyCharacters()
      .build();

    const expected = [
      [
        'Pedro Henrique',
        'brasileiro',
        'casado',
        'CPF 102.519.624-40',
        'residente e domiciliadaa Rua dos bobos',
        'zero',
        'bairro Alphaville',
        'São Paulo.',
      ],
    ];

    expect(sut).to.be.deep.equal(expected);
  });
});
