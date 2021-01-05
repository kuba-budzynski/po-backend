
import enums from './utils/Enums';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Watek = new Schema({
    zadanie: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Zadanie'
    },
    sesja: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Sesja'
    },
    temat: {
        type: String
    },
    zalozono: {
        type: Date,
        required: true
    },
    pytania: [{
        autor: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Druzyna'
        },
        rola: {
            type: String,
            required: true,
            enum: enums.rolaWSystemie.arr,
            default: enums.rolaWSystemie.default
        },
        tresc: {
            type: String,
            required: true
        },
        wyslano: {
            type: Date,
            required: true
        }
    }],
    odpowiedzi: [{
        autor: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'SedziaZadania'
        },
        rola: {
            type: String,
            required: true,
            enum: enums.rolaWSystemie.arr,
            default: enums.rolaWSystemie.default
        },
        tresc: {
            type: String,
            required: true
        },
        wyslano: {
            type: Date,
            required: true
        }
    }]
});

export default Watek;