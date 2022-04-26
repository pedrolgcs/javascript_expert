const assert = require('assert');

function* calculate(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield 'Hello';
  yield '-';
  yield 'World';
  yield* calculate(20, 10);
}

const generate = main();

assert.deepStrictEqual(generate.next(), { value: 'Hello', done: false });
assert.deepStrictEqual(generate.next(), { value: '-', done: false });
assert.deepStrictEqual(generate.next(), { value: 'World', done: false });
assert.deepStrictEqual(generate.next(), { value: 200, done: false });
assert.deepStrictEqual(generate.next(), { value: undefined, done: true });

assert.deepEqual(Array.from(main()), ['Hello', '-', 'World', 200]);
assert.deepEqual([...main()], ['Hello', '-', 'World', 200]);

// ------------------------------------------------
const { readFile, stat, readdir } = require('fs/promises');

async function* systemInfo() {
  const file = await readFile(__filename);
  yield { file: file.toString() };

  const { size } = await stat(__filename);
  yield { size };

  const dir = await readdir(__dirname);
  yield { dir };
}

(async () => {
  for await (const item of systemInfo()) {
    console.log(item);
  }
})();

// ------------------------------------------------
(() => {
  function* fibonacci(number) {
    let a = 0,
      b = 1,
      current;

    while (number > 0) {
      current = a;

      yield current;

      a = b;
      b = current + b;
      number--;
    }
  }

  assert.deepStrictEqual([...fibonacci(10)], [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);

  /*
  const sequence = fibonacci(10);

  for (let i = 0; i < 10; i++) {
    console.log(sequence.next().value);
  }
  */
})();
