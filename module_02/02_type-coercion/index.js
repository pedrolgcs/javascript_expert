console.assert(String(123) === '123', 'String(123) === "123"');
console.assert(('hello' || 123) === 'hello', '("hello" || 123) === "hello"');
console.assert(('hello' && 123) === 123, '("hello" && 123) === 123');

const item = {
  name: 'Pedro',
  age: 29,

  toString() {
    return `name: ${this.name}, age: ${this.age}`;
  },

  valueOf() {
    return 10;
  },

  [Symbol.toPrimitive](hint) {
    const types = {
      string: JSON.stringify(this),
      number: '007',
    };

    return types[hint] || types.string;
  },
};

console.assert(
  item + 0 === '{"name":"Pedro","age":29}0',
  'item + 0 === {"name":"Pedro","age":29}0'
);

console.assert(!!item);
