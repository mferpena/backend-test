import Joi from 'joi';

export const registerEntrySchema = Joi.object({
    plateNumber: Joi.string().required(),
});

export const registerExitSchema = Joi.object({
    plateNumber: Joi.string().required(),
});

export const registerVehicle = Joi.object({
    plateNumber: Joi.string().required(),
});
