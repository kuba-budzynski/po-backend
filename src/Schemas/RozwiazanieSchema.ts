var mongoose = require('mongoose');
import enums from './utils/Enums';
var Schema = mongoose.Schema;

const Rozwiazanie = new Schema({
    autor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Druzyna'
    },
    zadanie: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Zadanie'
    },
    wyslano: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: enums.statusRozwiazania.arr,
        default: enums.statusRozwiazania.default
    },
    czasRozwiazania: {
        type: Number
    },
    plikRozwiazania: {
        nazwa: {
            type: String,
            required: true
        },
        rozmiar: {
            type: Number,
            required: true
        },
        kod: {
            type: String,
            required: true
        }
    }
});

export default Rozwiazanie;