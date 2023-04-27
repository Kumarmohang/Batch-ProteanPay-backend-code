import Joi from 'joi';
import { UUIDRegx } from '../utils/regUuid';
export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  api_key: Joi.string().pattern(UUIDRegx),
  firstname: Joi.string().optional(),
  lastname: Joi.string().optional(),
  status: Joi.string().valid('active', 'blocked'),
  org_name: Joi.string().allow('', null).optional(),
  address: Joi.string().optional(),
  fee: Joi.number().optional(),
  upper_cap_ammount: Joi.number().optional(),
  upper_cap_unit: Joi.string().optional(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
});

export const updateUserSchema = Joi.object({
  email: Joi.any().forbidden(),
  api_key: Joi.any().forbidden(),
  password: Joi.string().optional(),
  firstname: Joi.string().allow('', null).optional(),
  lastname: Joi.string().allow('', null).optional(),
  status: Joi.string().valid('active', 'blocked'),
  org_name: Joi.string().allow('', null).optional(),
  address: Joi.string().allow('', null).optional(),
  fee: Joi.number().optional(),
  upper_cap_ammount: Joi.number().optional(),
  upper_cap_unit: Joi.string().optional(),
});

export const OneTimeAccessTokenSchema = Joi.object({
  email: Joi.string().email().required(),
  firstname: Joi.string().optional(),
  lastname: Joi.string().optional(),
  org_name: Joi.string().optional(),
});
