var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Sesja = new Schema({
    zadania: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Zadanie'
    }],
    administrator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Administrator"
    },
    sedziaGlowny: {
        type: Schema.Types.ObjectId,
        ref: 'SedziaGlowny'
    },
    start: {
        type: Date,
        required: true
    },
    koniec: {
        type: Date,
        required: true
    },
    nazwa: {
        type: String,
        required: true
    },
    dozwoloneRozszerzenia: [{
        type: String,
        required: true
    }],
    druzyny: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Druzyna'
    }],
    sedziowieZadan: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'SedziaZadania'
    }],
    opis: {
        type: String
    },
    rejestracja: {
        start: {
            type: Date,
            required: true
        },
        koniec: {
            type: Date,
            required: true
        },
        wyniki: {
            type: Date,
            required: true
        }
    },
    ranking: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Ranking'
    },
    watki: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Watek'
    }]
});

export default Sesja;