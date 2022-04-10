const { deepStrictEqual } = require('assert');

// tipos primitivos geram uma cópia em memória
{
  let count01 = 0;
  let count02 = count01;

  count02++;

  deepStrictEqual(count01, 0);
  deepStrictEqual(count02, 1);
}

// tipo de referência, copia o endereço de memória
// e aponta para o mesmo lugar
{
  const item01 = {
    counter: 0,
  };
  const item02 = item01;

  item02.counter++;

  deepStrictEqual(item01, { counter: 1 });

  item01.counter++;

  deepStrictEqual(item02, { counter: 2 });
}
