'use strict';
const { readFile } = require('fs/promises');
const { join } = require('path');
const pdf = require('pdf-parse');

(async () => {
  const dataBuffer = await readFile(join(__dirname, '..', 'assets', 'contrato.pdf'));
  const parsedPdf = await pdf(dataBuffer);
  console.log(parsedPdf.text);
})();
