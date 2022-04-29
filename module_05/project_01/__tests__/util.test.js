const { describe, it } = require('mocha');
const { expect } = require('chai');
const { InvalidRegexError, evaluateRegex } = require('../src/util');

describe('Util', () => {
  it('#evaluateRegex should be able to return an throw error using an unsafe regex', () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/;
    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError);
  });

  it('#evaluateRegex should be able to valid a safe regex', () => {
    const safeRegex = /^([a-z])$/gm;
    expect(() => evaluateRegex(safeRegex)).to.not.throw(InvalidRegexError);
    expect(evaluateRegex(safeRegex)).to.be.ok;
  });
});
