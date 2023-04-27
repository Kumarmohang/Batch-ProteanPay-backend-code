import Joi from 'joi';
import { UUIDRegx } from '../utils/regUuid';

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  firstname: Joi.string().optional(),
  lastname: Joi.string().optional(),
  status: Joi.string().optional(),
  org_name: Joi.string().optional(),
  address: Joi.string().optional(),
  fee: Joi.number().optional(),
  upper_cap_amount: Joi.number().optional(),
  upper_cap_unit: Joi.string().optional(),
  api_key: Joi.string().pattern(UUIDRegx).optional(),
  is_verified: Joi.boolean().optional(),
  redirect_url: Joi.string().optional(),
  hook: Joi.string().optional(),
});
