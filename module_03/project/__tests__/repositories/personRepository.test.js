import fs from 'fs';
import mocha from 'mocha';
import sinon from 'sinon';
import chai from 'chai';
import Person from '../../src/entities/person.js';
import * as personRepository from '../../src/repositories/personRepository.js';

const { describe, it, beforeEach, afterEach } = mocha;
const { expect } = chai;

describe('PersonRepository', () => {
  let sandbox = {};

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be able to save a new person in database', async () => {
    const person = new Person({
      id: 1,
      vehicles: ['Car'],
      kmTraveled: 1000,
      from: '2021-01-01',
      to: '2021-02-02',
    });
    const expected = [person];

    sandbox.stub(fs, fs.readFileSync.name).returns(JSON.stringify([]));
    sandbox.stub(fs, fs.writeFileSync.name).returns(null);
    sandbox.spy(JSON, JSON.stringify.name);

    await personRepository.save(person);

    expect(JSON.stringify.calledWith(expected)).to.be.true;
  });
});
