import Joi from 'joi';

export const SesjaJoi = Joi.object({
    id: Joi.string().length(24).required(),
    druzyny: Joi.array().items(Joi.string().length(24)).optional(),
    sedziowieZadan: Joi.array().items(Joi.string().length(24)).optional(),
    watki: Joi.array().items(Joi.string().length(24)).optional(),
    zadania: Joi.array().items(Joi.string().length(24)).optional()
});

const validateUpdatedSession = (obj: Object) => SesjaJoi.validate(obj);

export default validateUpdatedSession;