import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const LOG_LEVEL = process.env.NODE_ENV !== 'development' ? 'error' : 'debug';
export const SMTP_CONFIG = {
  HOST: process.env.SMTP_HOST,
  PORT: Number(process.env.SMTP_PORT) || 587,
  USERNAME: process.env.SMTP_USERNAME,
  PASSWORD: process.env.SMTP_PASSWORD,
  SENDER: process.env.SMTP_SENDER,
  TLS: process.env.SMTP_TLS,
};

export const PDF_CONFIG = {
  PDF_STORAGE_PATH: process.env.PDF_STORAGE_PATH || './assets',
};

export const TX_RECEIPT_CONFIG = {
  TX_RECEIPT_PATH: process.env.TX_RECEIPT_PATH || './assets',
};

export const { FIREFOX_PATH } = process.env;
export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, DB_ENGINE } =
  process.env;
