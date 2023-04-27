require('ts-node/register');

const { migrator } = require('./umzug');

console.log('migrator', migrator);
migrator.runAsCLI();
