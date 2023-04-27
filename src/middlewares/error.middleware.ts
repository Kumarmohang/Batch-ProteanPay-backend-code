import { NextFunction, Request, Response } from 'express';
import { isCelebrateError, CelebrateError } from 'celebrate';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';

type ErrorResponse = {
  message: string;
  errorCode: number | string;
  field?: Array<{ key: string; message: string }>;
};

/**
 * Middleware function for handling error
 *
 * @param {Error} error Any error
 * @param req user request
 * @param res user response
 * @param next next function
 * @returns {void} nothing
 */
const errorMiddleware = (error: Error | HttpException | CelebrateError, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.errorCode || 500;
    const message: string = error.message || 'Something went wrong';
    const errorObj: ErrorResponse = { message, errorCode: status };

    if (isCelebrateError(error)) {
      errorObj.field = [...error.details.entries()].map(([key, joiError]) => ({
        key: key,
        message: joiError.details.map(ele => ele.message),
      }));
      errorObj.errorCode = 400;
    }

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);

    res.status(errorObj.errorCode).json(errorObj);
  } catch (err) {
    next(err);
  }
};

export default errorMiddleware;
