import { database } from './shared/database/db.mjs';

class Application {
  constructor(factory) {
    this.table = factory.createTable();
  }

  inicialize(database) {
    this.table.render(database);
  }
}

(async function main() {
  const path = globalThis.window ? 'browser' : 'console';

  // dynamic import
  const { default: ViewFactory } = await import(
    `./platforms/${path}/index.mjs`
  );

  const app = new Application(new ViewFactory());

  app.inicialize(database);
})();
