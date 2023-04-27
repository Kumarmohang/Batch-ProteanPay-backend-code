import Joi from 'joi';
import { UUIDRegx } from '../utils/regUuid';

export const invoiceDirectorySchema = Joi.object({
  name: Joi.string().required(),
  customDirectoryIdentifier: Joi.string().required(),
  startDate: Joi.string().optional(),
  endDate: Joi.string().optional(),
  isBatchTransactionOnly: Joi.boolean().optional(),
});

export const invoiceDirectoryParamsSchema = Joi.object({
  search: Joi.string().optional(),
  offset: Joi.number().optional(),
  limit: Joi.number().optional(),
  sort: Joi.string().optional(),
});

export const invoiceDirectoryIdSchema = Joi.object({
  customDirectoryIdentifier: Joi.string().required(),
});

export const invoiceDirectoryIdSchemaDashboard = Joi.alternatives().try(
  Joi.object().keys({
    directoryId: Joi.string().pattern(UUIDRegx).allow(''),
    customDirectoryIdentifier: Joi.string(),
  }),
  Joi.object().keys({
    directoryId: Joi.string().pattern(UUIDRegx),
    customDirectoryIdentifier: Joi.string().allow(''),
  }),
);

export const invoiceDirectoryUpdateSchema = Joi.object({
  status: Joi.string().optional(),
});
