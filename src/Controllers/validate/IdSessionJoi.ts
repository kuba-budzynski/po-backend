import Joi from 'joi';

export const SesjaJoi = Joi.string().length(24).required();

const validateIdSesja = (obj: String) => SesjaJoi.validate(obj);

export default validateIdSesja;