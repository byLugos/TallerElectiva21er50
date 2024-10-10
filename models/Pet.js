const mongoose = require('mongoose');

const {Schema} = mongoose

const schemaPet = new Schema({
    id: {
        type: String,
        required : true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'owner'
    }
})

module.exports = mongoose.model('pet', schemaPet)