import { UUIDRegx } from '@/utils/regUuid';
import Joi from 'joi';

export const TransactionRequestSchema = Joi.object({
  payerPublicAddress: Joi.string().required(),
  invoiceIds: Joi.array().items(Joi.string().pattern(UUIDRegx)).required(),
  type: Joi.string().valid('approval', 'payment').required(),
});

export const TransactionUpdateRequestSchema = Joi.object({
  txnHash: Joi.string().optional().allow(null, ''),
  txnId: Joi.string().pattern(UUIDRegx).required(),
  status: Joi.string().valid('initiated', 'complete', 'failed', 'pending').required(),
  gasFee: Joi.number().required().unsafe(),
  blockNo: Joi.string().required().allow(null, ''),
});

export const TransactionIdSchema = Joi.object({
  txnId: Joi.string().pattern(UUIDRegx).required(),
});

export const CustomDirectoryIdentifierSchema = Joi.object({
  customDirectoryIdentifier: Joi.string().required(),
});
