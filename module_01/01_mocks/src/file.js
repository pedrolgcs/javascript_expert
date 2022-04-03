const path = require('path');
const User = require('./user');
const { readFile } = require('fs/promises');
const { error } = require('./constants');

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age'],
};

class File {
  async #getFileContent(filePath) {
    const file = path.join(__dirname, 'mocks', filePath);
    return readFile(file, { encoding: 'utf8' });
  }

  #parseCSVToJSON(csvString) {
    const lines = csvString.split('\n');
    const header = lines.shift().split(',');

    const users = lines.reduce((acc, currLine) => {
      const columns = currLine.split(',');
      let user = {};

      for (const index in columns) {
        user[header[index]] = columns[index];
      }

      acc.push(new User(user));

      return acc;
    }, []);

    return JSON.stringify(users);
  }

  #isValid(csvContent, options = DEFAULT_OPTIONS) {
    const [header, ...content] = csvContent.split('\n');

    const isHeaderValid = header === options.fields.join(',');

    if (!isHeaderValid) {
      return {
        valid: false,
        error: error.FILE_FIELDS_ERROR_MESSAGE,
      };
    }

    const isContentLengthAccepted =
      content.length > 0 && content.length <= options.maxLines;

    if (!isContentLengthAccepted) {
      return {
        valid: false,
        error: error.FILE_LENGTH_ERROR_MESSAGE,
      };
    }

    return {
      valid: true,
      error: null,
    };
  }

  async csvToJson(filePath) {
    const csvContent = await this.#getFileContent(filePath);

    const isValid = this.#isValid(csvContent);

    if (!isValid.valid) {
      throw new Error(isValid.error);
    }

    const jsonContent = this.#parseCSVToJSON(csvContent);

    return jsonContent;
  }
}

module.exports = File;
