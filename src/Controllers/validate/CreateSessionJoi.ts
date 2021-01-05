import Joi from 'joi';

export const SesjaJoi = Joi.object({
    administrator: Joi.string().length(24).required(),
    sedziaGlowny: Joi.string().length(24).optional(),
    start: Joi.date().required().greater('now'),
    koniec: Joi.date().required().greater(Joi.ref('start')),
    nazwa: Joi.string().required(),
    dozwoloneRozszerzenia: Joi.array().items(Joi.string()).required(),
    rejestracja: Joi.object({
        start: Joi.date().required().greater('now'),
        koniec: Joi.date().greater(Joi.ref('start')).required(),
        wyniki: Joi.date().greater(Joi.ref('koniec')).required()
    }).required(),
    opis: Joi.string().max(512).optional(),
    ranking: Joi.string().length(24).required(),
    /////////////////////////////////////////////////////////////
    watki: Joi.array().items(Joi.string().length(24)).optional(),
    zadania: Joi.array().items(Joi.string().length(24)).optional(),
    druzyny: Joi.array().items(Joi.string().length(24)).optional(),
    sedziowieZadan: Joi.array().items(Joi.string().length(24)).optional(),
});

const validateCreatedSesja = (obj: Object) => SesjaJoi.validate(obj); 

export default validateCreatedSesja;