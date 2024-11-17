const mongoose = require('mongoose');

const {Schema} = mongoose

const schemaPet = new Schema({
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
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'appointment',
        },
    ],
})

module.exports = mongoose.model('pet', schemaPet)