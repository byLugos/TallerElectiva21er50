const Owner = require('../models/Owner')
const Pet = require('../models/Pet')
module.exports = {
    'findAll' : async (req, res) => {
        try{
            const result = await Owner.find({})
            return res.status(200).json({state:'Success', data: result})
        }catch(err){
            return res.status(500).json({state: "Error", data: null})
        }
    },
    'findById': async (req, res) => {
        const {id} = req.params
        try{
            const result = await Owner.findById(id)
            if (result){
                return res.status(200).json({state: 'Success', data: result})
            }
            return res.status(404).json({state: 'Error', data: null})
        }catch(err){
            return res.status(500).json({state:'Error', data: err})
        }
    },
    'save': async (req, res) => {
        try {
            const { name, phone, email, pets, ...ownerData } = req.body;
            if (!pets || pets.length === 0) {
                return res.status(400).json({ state: false, message: 'El dueño debe tener al menos una mascota' });
            }
            const existingName = await Owner.findOne({ name: name });
            if (existingName) {
                return res.status(400).json({ state: false, message: 'El nombre del propietario ya existe. Debes elegir otro nombre.' });
            }
            const existingPhone = await Owner.findOne({ phone: phone });
            if (existingPhone) {
                return res.status(400).json({ state: false, message: 'El número de teléfono ya está registrado. Debes proporcionar otro número.' });
            }
            const existingEmail = await Owner.findOne({ email: email });
            if (existingEmail) {
                return res.status(400).json({ state: false, message: 'El correo electrónico ya está registrado. Debes proporcionar otro correo.' });
            }
            const conflictingOwners = await Owner.find({ pets: { $in: pets } });
            if (conflictingOwners.length > 0) {
                return res.status(400).json({
                    state: false,
                    message: 'Una o más mascotas ya están asignadas a otro propietario.'
                });
            }
            const foundPets = await Pet.find({ _id: { $in: pets } });
            if (foundPets.length !== pets.length) {
                return res.status(404).json({ state: false, message: 'Algunas mascotas no se encontraron' });
            }
            const owner = new Owner({
                name,
                phone,
                email,
                pets: foundPets.map(pet => pet._id),
                ...ownerData
            });
            const result = await owner.save();
            return res.status(201).json({ state: true, data: result });
        } catch (err) {
            return res.status(500).json({ state: false, message: 'Error en el servidor', error: err.message });
        }
    },
    'deleteById': async (req, res) => {
        const id = req.params.id
        try{
            await Owner.deleteOne({ _id: id })
            return res.status(200).json({state:'Success', data: 'Propietario eliminado con exito'})
        }catch(err){
            return res.status(500).json({state:'Error', data: err})
        }
    },
    'update': async (req, res) => {
        const id  = req.params.id
        const owner = req.body
        try{
            const ownerExists = await Owner.findById(id)
            if (ownerExists){
                const result = await Owner.updateOne(
                    { _id: id },
                    { $set: owner }
                )
                return res.status(200).json({state: 'Success', data: result})
            }
            return res.status(404).json({state: 'Error', data: `Owner con ID ${id} no encontrado.`})
        } catch(err){
            return res.status(500).json({state:'Error', data: err.message})
        }
    }
}