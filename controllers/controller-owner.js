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
            const { pets, ...ownerData } = req.body;
            if (!pets || pets.length === 0) {
                return res.status(400).json({ state: false, message: 'El dueño debe tener al menos una mascota' });
            }
            const owner = new Owner(ownerData);
            const foundPets = await Pet.find({ _id: { $in: pets } });
            if (foundPets.length !== pets.length) {
                return res.status(404).json({ state: false, message: 'Algunas mascotas no se encontraron' });
            }
            owner.pets = foundPets.map(pet => pet._id);  
            const result = await owner.save();
            return res.status(201).json({ state: true, data: result });
        } catch (err) {
            return res.status(500).json({ state: false, data: err.message });
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