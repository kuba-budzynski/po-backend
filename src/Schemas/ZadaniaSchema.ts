var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Zadanie = new Schema({
    sedzia: {
        type: Schema.Types.ObjectId,
        ref: 'SedziaZadania'
    },
    tresc: {
        type: String,
        required: true
    },
    numer: {
        type: Number,
        required: true
    },
    nazwa: {
        type: String,
        required: true
    },
    testy: [{
        daneWejsciowe: {
            type: String,
            required: true
        },
        daneWyjsciowe: {
            type: String,
            required: true
        },
        limitCzasowy: {
            type: Number
        }
    }]
});

export default Zadanie;