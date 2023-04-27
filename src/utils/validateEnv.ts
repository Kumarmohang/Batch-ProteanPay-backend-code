import { cleanEnv, port, str } from 'envalid';

/**
 * This function validate env.
 *
 * @returns {void}nothing
 */
function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
  });
}

export default validateEnv;
