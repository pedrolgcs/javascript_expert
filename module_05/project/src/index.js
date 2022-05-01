'use strict';

const { readFile } = require('fs/promises');
const { join } = require('path');
const pdf = require('pdf-parse');
const TextProcessorFacade = require('./textProcessorFacade');

(async () => {
  const dataBuffer = await readFile(
    join(__dirname, '..', 'assets', 'contrato.pdf')
  );

  const parsedPdf = await pdf(dataBuffer);

  const textProcessor = new TextProcessorFacade(parsedPdf.text);

  const peoples = textProcessor.getPeopleFromPDF();

  console.log(peoples);
})();
