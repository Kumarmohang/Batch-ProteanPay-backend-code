import nodemailer from 'nodemailer';
import { MailInterface } from '@interfaces/mail.interface';
import { logger } from './logger';
import { SMTP_CONFIG } from '@config';

/**
 * Mail service for sending emails
 *
 * @class
 */
export default class MailService {
  private static instance: MailService;
  private transporter: nodemailer.Transporter;

  /**
   * Mail service private constructor
   */
  private constructor() {
    logger.verbose('Mail service Initialized.');
  }
  //INSTANCE CREATE FOR MAIL
  /**
   * This static function returns a MailService
   *
   * @returns MailService singleton instance
   */
  static getInstance() {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }
  /**
   * This function creates mail server for development env.
   *
   * @returns {void} void
   */
  async createLocalConnection() {
    const account = await nodemailer.createTestAccount();
    this.transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
  }

  /**
   * This function creates mail server for prod env.
   *
   * @returns {void} void
   */
  async createConnection() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_CONFIG.HOST,
      port: Number(SMTP_CONFIG.PORT),
      secure: SMTP_CONFIG.TLS === 'yes' ? true : false,
      auth: {
        user: SMTP_CONFIG.USERNAME,
        pass: SMTP_CONFIG.PASSWORD,
      },
    });
  }
  /**
   * This function sends mail to the recipient provided in option.
   *
   * @param requestId request id of mail
   * @param options email options
   * @returns the response of the email
   */
  async sendMail(requestId: string | number | string[], options: MailInterface) {
    return this.transporter
      .sendMail({
        from: options.from,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        text: options.text,
        html: options.html,
      })
      .then(info => {
        logger.info(`${requestId} - Mail sent successfully!!`);
        logger.info(`${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`);
        if (process.env.NODE_ENV === 'local') {
          logger.info(`${requestId} - Nodemailer ethereal URL: ${nodemailer.getTestMessageUrl(info)}`);
        }
        return info;
      });
  }
  /**
   * Verifies SMTP configuration
   *
   * @returns status of the smtp.
   */
  async verifyConnection() {
    return this.transporter.verify();
  }
  /**
   * This function is getter function for nodemailer transporter
   *
   * @returns nodemailer transporter
   */
  getTransporter() {
    return this.transporter;
  }
}
