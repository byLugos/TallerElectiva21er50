const Pet = require('../models/Pet');
module.exports = {
    'findAll': async (req, res) => {
        try {
            const result = await Pet.find({});
            return res.status(200).json({ state: true, data: result });
        } catch (err) {
            return res.status(500).json({ state: false, data: err });
        }
    },
    'findById': async (req, res) => {
        const { id } = req.params;
        try {
            const result = await Pet.findById(id);
            if (result) {
                return res.status(200).json({ state: true, data: result });
            }
            return res.status(404).json({ state: true, data: null });
        } catch (err) {
            return res.status(500).json({ state: false, data: err });
        }
    },
    'save': async (req, res) => {
        const { name, ...petData } = req.body;
        try {
            const existingPet = await Pet.findOne({ name: name });
            if (existingPet) {
                return res.status(400).json({
                    state: false,
                    message: 'El nombre de la mascota ya existe. Por favor, elige otro nombre.'
                });
            }
            const pet = new Pet({ name, ...petData });
            const result = await pet.save();
            return res.status(200).json({ state: 'Success', data: result });
        } catch (err) {
            return res.status(500).json({ state: 'Error', data: err });
        }
    },
    'deleteById': async (req, res) => {
        const { id } = req.params;
        try {
            await Pet.deleteOne({ _id: id });
            return res.status(200).json({ state: true, data: 'Mascota eliminada correctamente' });
        } catch (err) {
            return res.status(500).json({ state: false, data: err });
        }
    },
    'update': async (req, res) => {
        const id = req.params.id;
        const pet = req.body;
        try {
            const petExist = await Pet.findById(id);
            if (petExist) {
                const result = await Pet.updateOne(
                    { _id: id },
                    { $set: pet }
                );
                return res.status(200).json({ state: 'Success', data: result });
            }
            return res.status(404).json({ state: 'Error', data: `Mascota con ID ${id} no encontrada.` });
        } catch (err) {
            return res.status(500).json({ state: 'Error', data: err.message });
        }
    }
};
