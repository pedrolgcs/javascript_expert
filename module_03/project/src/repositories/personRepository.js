import fs from 'fs';
import appRoot from 'app-root-path';

export const save = async (data) => {
  /*
  ! Not working with mocha
  const { pathname: databasePath } = new URL(
    '../infra/database/db.json',
    import.meta.url
  );
  */

  const databasePath = appRoot.resolve('src/infra/database/db.json');

  const currentData = JSON.parse(fs.readFileSync(databasePath, 'utf8'));

  currentData.push(data);

  fs.writeFileSync(databasePath, JSON.stringify(currentData), 'utf8');
};
