import Joi from 'joi';
import { UUIDRegx } from '../utils/regUuid';
export const createInvoiceSchema = Joi.object({
  customDirectoryIdentifier: Joi.string().required(),
  customInvoiceIdentifier: Joi.string().required(),
  creationDate: Joi.date().required(),
  from: Joi.string().required(),
  to: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  memo: Joi.string().optional(),
  extraData: Joi.array()
    .items(
      Joi.object({
        keyName: Joi.string().required(),
        value: Joi.string().required(),
      }),
    )
    .optional(),
  payer: Joi.object({
    email: Joi.string().required(),
    payerText: Joi.string().required(),
  }).required(),
  tokenSymbol: Joi.string().required(),
  tokenName: Joi.string().optional(),
  tokenId: Joi.string().pattern(UUIDRegx).optional(),
  blockChainId: Joi.string().pattern(UUIDRegx).optional(),
  finalPaymentAmonut: Joi.string().optional(),
  finalPaymentCurrency: Joi.string().optional(),
  allowedPaymentCurrency: Joi.string().optional(),
  status: Joi.string().optional(),
  isDeleted: Joi.boolean().optional(),
  transactionId: Joi.string().pattern(UUIDRegx).optional(),
  destinationPublicAddress: Joi.string().optional(),
  taxPercent: Joi.number().optional(),
  taxAmount: Joi.number().optional(),
  discountPercent: Joi.number().optional(),
  discountAmount: Joi.number().optional(),
  totalAmount: Joi.number().required(),
  invoiceItems: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().required(),
        quantity: Joi.number().optional(),
        rate: Joi.number().optional(),
        taxPercent: Joi.number().optional(),
        customInvoiceIdentifier: Joi.string().optional(),
        customDirectoryIdentifier: Joi.string().optional(),
        extraData: Joi.array()
          .items(
            Joi.object({
              keyName: Joi.string().required(),
              value: Joi.string().required(),
            }),
          )
          .optional(),
        amount: Joi.number().required(),
      }),
    )
    .required(),
});

export const getInvoiceSchema = Joi.object({
  directoryId: Joi.string().optional(),
  customDirectoryIdentifier: Joi.string().optional(),
  status: Joi.string().valid('pending', 'approved', 'paid').optional(),
  limit: Joi.number().optional(),
  offset: Joi.number().optional(),
  search: Joi.string().optional(),
  dateFrom: Joi.string().optional(),
  dateTo: Joi.string().optional(),
});

export const directoryIdSchema = Joi.object({
  directoryId: Joi.string().pattern(UUIDRegx).required(),
});

export const updateStatusSchema = Joi.object({
  status: Joi.string().required(),
  invoiceIds: Joi.array().items(Joi.string().pattern(UUIDRegx)).required(),
});

export const getInvoiceHtmlSchema = Joi.object({
  customInvoiceIdentifier: Joi.string().required(),
});
