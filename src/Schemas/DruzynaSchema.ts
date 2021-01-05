import enums from './utils/Enums';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Druzyna = new Schema({
    sesja: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Sesja'
    },
    statusDruzyny: {
        type: String,
        required: true,
        enum: enums.statusDruzyny.arr,
        default: enums.statusDruzyny.default
    },
    rozwiazania: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Rozwiazanie'
    }],
    wynik: {
        poprawne: {
            type: Number,
            required: true
        },
        czas: {
            type: Number,
            required: true
        }
    },
    powodDyskwalifikacji: {
        type: String
    },
    nazwa: {
        type: String,
        required: true
    },
    nazwaPlacowki: {
        type: String,
        required: true
    },
    placowka: {
        type: String,
        required: true,
        enum: enums.rodzajePlacowek.arr,
        default: enums.rodzajePlacowek.default
    },
    uczestnicy: [{
        czyKapitan: {
            type: Boolean,
            required: true
        },
        imie: {
            type: String,
            required: true
        },
        nazwisko: {
            type: String,
            required: true
        }
    }],
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
    }
});

export default Druzyna;