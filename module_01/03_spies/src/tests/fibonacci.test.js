const { deepStrictEqual } = require('assert');
const sinon = require('sinon');
const Fibonacci = require('../fibonacci');

(async () => {
  {
    const expectedCallCount = 4;
    const expectedFibonacciSequence = [0, 1, 1];

    const sut = new Fibonacci();
    const spy = sinon.spy(sut, sut.execute.name);

    const fibonacciSequence = [];
    for await (const value of sut.execute(3)) {
      fibonacciSequence.push(value);
    }

    deepStrictEqual(spy.callCount, expectedCallCount);
    deepStrictEqual(fibonacciSequence, expectedFibonacciSequence);
  }

  {
    const expectedFibonacciSequence = [0, 1, 1, 2, 3];
    const expectedCallCount = 6;
    const expectedArgsInSecondCall = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });

    const sut = new Fibonacci();
    const spy = sinon.spy(sut, sut.execute.name);

    const [...results] = sut.execute(5);

    deepStrictEqual(results, expectedFibonacciSequence);
    deepStrictEqual(spy.callCount, expectedCallCount);
    deepStrictEqual(spy.getCall(2).args, expectedArgsInSecondCall);
  }
})();
