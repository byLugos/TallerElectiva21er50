const mongoose = require('mongoose')

const {Schema} = mongoose

const schemaOwner = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'pet'
        }
    ]
})

module.exports = mongoose.model('owner', schemaOwner)