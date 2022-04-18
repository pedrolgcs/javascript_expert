import fs from 'fs';

export const save = async (data) => {
  const { pathname: databasePath } = new URL(
    '../infra/database/db.json',
    import.meta.url
  );

  const currentData = JSON.parse(fs.readFileSync(databasePath, 'utf8'));

  currentData.push(data);

  fs.writeFileSync(databasePath, JSON.stringify(currentData), 'utf8');
};
