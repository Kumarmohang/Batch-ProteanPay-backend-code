import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from '@exceptions/HttpException';

/**
 * Thi middleware validate user request
 *
 * @param type Any DTO Class Constructor
 * @param value where to validate in request ("body", "query", "param") default is body
 * @param skipMissingProperties If set to true then validator will skip validation of all properties that are null or undefined in the validating object.
 * @param whitelist If set to true validator will strip validated object of any properties that do not have any decorators.
 * @param forbidNonWhitelisted If set to true, instead of stripping non-whitelisted properties validator will throw an error
 * @returns RequestHandler function
 */
const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, _res, next) => {
    validate(plainToInstance(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
