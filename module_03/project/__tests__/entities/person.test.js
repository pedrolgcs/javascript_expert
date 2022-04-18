import mocha from 'mocha';
import chai from 'chai';
import Person from '../../src/entities/person.js';

const { describe, it } = mocha;
const { expect } = chai;

describe('Person', () => {
  it('should not be able to return a person instance from a invalid string', () => {
    const expected = 'Invalid data';

    expect(() => {
      Person.generateInstanceFromString('invalid data');
    }).to.throw(expected);
  });

  it('should be able to return a person instance from string', () => {
    const expected = {
      id: '1',
      vehicles: ['bike', 'car'],
      kmTraveled: '100',
      from: '2022-01-01',
      to: '2022-02-02',
    };

    const sut = Person.generateInstanceFromString(
      '1 bike,car 100 2022-01-01 2022-02-02'
    );

    expect(sut).to.deep.equal(expected);
  });

  it('should be able to format a person data', () => {
    const expected = {
      id: 1,
      vehicles: 'bike e car',
      kmTraveled: '100 km',
      from: '01 de janeiro de 2022',
      to: '02 de fevereiro de 2022',
    };

    const sut = new Person({
      id: '1',
      vehicles: ['bike', 'car'],
      kmTraveled: '100',
      from: '2022-01-01',
      to: '2022-02-02',
    }).formatted();

    expect(sut).to.deep.equal(expected);
  });
});
