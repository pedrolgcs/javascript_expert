import TerminalController from './controllers/terminalController.js';
import database from './infra/database/db.json';
import Person from './entities/person.js';
import { save } from './repositories/personRepository.js';

const DEFAULT_LANG = 'pt-BR';
const STOP_TERMINAL = ':q';

// inicialize
const terminalController = new TerminalController();

terminalController.inicializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question();

    if (answer === STOP_TERMINAL) {
      terminalController.closeTerminal();
      return;
    }

    // create new person
    const person = Person.generateInstanceFromString(answer);

    // add person to database
    await save(person);

    // update table
    terminalController.updateTable(person.formatted(DEFAULT_LANG));

    return mainLoop();
  } catch (error) {
    console.log('vai sair');
    console.log('Deu ruim!', error);
    return mainLoop();
  }
}

await mainLoop();
