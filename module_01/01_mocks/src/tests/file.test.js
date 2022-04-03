const { rejects, deepStrictEqual } = require('assert');
const { error } = require('../constants');
const File = require('../file');

(async () => {
  // ERROR
  const file = new File();

  {
    const filePath = 'empty-file.csv';
    const expect = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

    const sut = file.csvToJson(filePath);

    await rejects(sut, expect);
  }

  {
    const filePath = 'invalid-items-file.csv';
    const expect = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

    const sut = file.csvToJson(filePath);

    await rejects(sut, expect);
  }

  {
    const filePath = 'invalid-header-file.csv';
    const expect = new Error(error.FILE_FIELDS_ERROR_MESSAGE);

    const sut = file.csvToJson(filePath);

    await rejects(sut, expect);
  }

  {
    const filePath = 'empty-file.csv';
    const expect = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

    const sut = file.csvToJson(filePath);

    await rejects(sut, expect);
  }

  // SUCCESS
  {
    const filePath = 'file.csv';
    const expect = JSON.stringify([
      {
        id: 123,
        name: 'Eric Wendel',
        profession: 'Javascript Developer',
        age: 30,
      },
      {
        id: 321,
        name: 'Pedro Doe',
        profession: 'Python Developer',
        age: 25,
      },
      {
        id: 111,
        name: 'Jane Doe',
        profession: 'Ruby Developer',
        age: 20,
      },
    ]);

    const sut = await file.csvToJson(filePath);

    deepStrictEqual(sut, expect);
  }
})();
