const Appointment = require('../models/Appointment');

module.exports = {
    findAll: async (req, res) => {
        try {
            const appointments = await Appointment.find({});
            res.status(200).json({ state: 'Success', data: appointments });
        } catch (err) {
            res.status(500).json({ state: 'Error', message: err.message });
        }
    },
    findById: async (req, res) => {
        const { id } = req.params;
        try {
            const appointment = await Appointment.findById(id);
            if (appointment) {
                res.status(200).json({ state: 'Success', data: appointment });
            } else {
                res.status(404).json({ state: 'Error', message: 'Cita no encontrada' });
            }
        } catch (err) {
            res.status(500).json({ state: 'Error', message: err.message });
        }
    },
    save: async (req, res) => {
        const { pet_id, date_time, reason, status, notes } = req.body;
        try {
            const newAppointment = new Appointment({ pet_id, date_time, reason, status, notes });
            const savedAppointment = await newAppointment.save();
            res.status(201).json({ state: 'Success', data: savedAppointment });
        } catch (err) {
            res.status(500).json({ state: 'Error', message: err.message });
        }
    },
    deleteById: async (req, res) => {
        const { id } = req.params;
        try {
            await Appointment.findByIdAndDelete(id);
            res.status(200).json({ state: 'Success', message: 'Cita eliminada correctamente' });
        } catch (err) {
            res.status(500).json({ state: 'Error', message: err.message });
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;
        try {
            const updatedAppointment = await Appointment.findByIdAndUpdate(id, updates, { new: true });
            res.status(200).json({ state: 'Success', data: updatedAppointment });
        } catch (err) {
            res.status(500).json({ state: 'Error', message: err.message });
        }
    },
};
