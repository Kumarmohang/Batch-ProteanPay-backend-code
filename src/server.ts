import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { logger } from './utils/logger';
import ALL_REGISTERED_ROUTES from './routes/index';

validateEnv();

try {
  const app = new App(ALL_REGISTERED_ROUTES);
  app
    .init()
    .then(() => {
      app.listen();
    })
    .catch(err => {
      logger.error('Error occured while intialising app');
      logger.error(err.message);
    });
} catch (error) {
  logger.error(error.message);
}
process.on('unhandledRejection', (err: Error) => {
  logger.error(`unhandledRejection ${err.message}`);
  logger.error(err.stack);
  process.exit(1);
});
process.on('uncaughtException', err => {
  logger.error(` uncaughtException ${err.message}`);
  logger.error(err.stack);
  process.exit(1);
});
