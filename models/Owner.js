const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaOwner = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pet'
        }
    ]
});
module.exports = mongoose.model('owner', schemaOwner);
