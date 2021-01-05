var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Ranking = new Schema({
    czyZamrozony: {
        type: Boolean,
        required: true
    },
    druzyny: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Druzyna'
    }]
});

export default Ranking;