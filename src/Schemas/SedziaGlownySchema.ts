import enums from './utils/Enums';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SedziaGlowny = new Schema({
    imie: {
        type: String
    },
    nazwisko: {
        type: String,
        required: true
    },
    daneLogowania: {
        email: {
            type: String,
            required: true
        },
        haslo: {
            type: String,
            required: true
        },
        rola: {
            type: String,
            required: true,
            enum: enums.rolaWSystemie.arr,
            default: enums.rolaWSystemie.default
        }
    },
    sesja: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Sesja'
    }
});

export default SedziaGlowny;