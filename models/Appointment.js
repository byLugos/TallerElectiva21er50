const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaAppointment = new Schema({
    pet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pet', 
        required: true
    },
    date_time: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'], // Estados permitidos
        default: 'scheduled'
    },
    notes: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('appointment', schemaAppointment);
