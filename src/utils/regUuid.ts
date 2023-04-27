import Joi from 'joi';

export const UUIDRegx = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

export const UUIDSchema = Joi.object({
  id: Joi.string().pattern(UUIDRegx).required(),
});
