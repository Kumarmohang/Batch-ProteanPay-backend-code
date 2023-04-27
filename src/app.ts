/* eslint-disable jsdoc/require-returns-check */
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import passport from 'passport';
import { authLocal } from './middlewares/passportAuth.middleware';
import session from 'express-session';
import { authJwt } from './middlewares/passportJwt.auth';
import MailService from './utils/MailService';
import { authApi } from './middlewares/passportApiKey.middleware';
import Path from 'path';

/**
 * Express App
 *
 * @class
 */
class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  /**
   *
   * @param routes  Route List for express app
   */
  constructor(private routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
  }

  /**
   * This function initialize DB connection,route apply middleware.
   *
   * @returns void
   */
  public async init(): Promise<void> {
    this.initializeMiddlewares();
    this.initializeRoutes(this.routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  /**
   * This function start server listing.
   *
   * @returns void
   */
  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  /**
   * Getter function for express app
   *
   * @returns express app
   */
  public getServer() {
    return this.app;
  }

  /**
   * This function apply middleware in app
   *
   * @returns void
   */
  private initializeMiddlewares() {
    MailService.getInstance();
    authLocal();
    authJwt();
    authApi();
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use('/merchant/invoice-pdf', express.static(Path.join('src/resources/invoice_pdfs')));
    this.app.use('/invoice-pdf', express.static(Path.join('src/resources/invoice_pdfs')));
    this.app.set('view-engine', 'ejs');
    this.app.use(passport.initialize());
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
      }),
    );
  }

  /**
   * This function apply routes in app
   *
   * @param routes list of routes
   * @returns void
   */
  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  /**
   * this function initialize swagger
   *
   * @returns void
   */
  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  /**
   * this function add error handler in app
   *
   * @returns void
   */
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
