import readline from 'readline';
import DraftLog from 'draftlog';
import chalkTable from 'chalk-table';
import Person from '../entities/person.js';

export default class TerminalController {
  print;
  data;
  terminal;

  constructor() {
    this.print = {};
    this.data = [];
    this.terminal = null;
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'vehicles', name: chalk.green('Vehicles') },
        { field: 'kmTraveled', name: chalk.yellow('Km Traveled') },
        { field: 'from', name: chalk.blue('From') },
        { field: 'to', name: chalk.cyan('To') },
      ],
    };
  }

  inicializeTable(database, language) {
    this.data = database.map((item) => new Person(item).formatted(language));
    this.print = console.draft(chalkTable(this.getTableOptions, this.data));
  }

  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(this.getTableOptions, this.data));
  }

  inicializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin);

    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.inicializeTable(database, language);
  }

  question(msg = '') {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  closeTerminal() {
    this.terminal.close();
  }
}
