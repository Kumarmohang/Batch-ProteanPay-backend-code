import { Umzug } from 'umzug';
import DB from '../databases';
import path from 'path';

export const migrator = new Umzug({
  migrations: {
    glob: ['migrations/*.ts', { cwd: path.join(__dirname + '/../') }],
  },
  context: DB['sequelize'],
  logger: console,
});

export type Migration = typeof migrator._types.migration;
