const Pet = require('../models/Pet')


module.exports = {
    'findAll': async (req, res) => {
        try{
            const result = await Pet.find({})
            return res.status(200).json({state: true, data: result})
        }catch(err){
            return res.status(500).json({state: false, data: err})
        }
    },
    'findById': async (req, res) => {
        const {id} = req.params
        try{
            const result = await Pet.findById(id)
            if (result){
                return res.status(200).json({state: true, data: result})
            }
            return res.status(404).json({state: true, data:null})
        }catch(err){
            return res.status(500).json({state: false, data:err})
        }
    },
    'save': async (req, res) => {
        const pet = new Pet(req.body)
        try{
            const result = await pet.save()
            return res.status(200).json({state: 'Success', data: result})
        }catch(err){
            return res.status(500).json({state:'Error', data: err})
        }
    },
    'deleteById': async (req, res) => {
        const {id} = req.params
        try{
            await Pet.deleteOne({_id: id})
            return res.status(200).json({state: true, data: 'Mascota eliminada correctamente'})
        }catch(err){
            return res.status(500).json({state: false, data: err})
        }
    },
    'update': async (req, res) => {
        const id  = req.params.id
        const pet = req.body
        try{
            const petExist = await Pet.findById(id)
            if (petExist){
                const result = await Pet.updateOne(
                    { _id: id },
                    { $set: pet }
                )
                return res.status(200).json({state: 'Success', data: result})
            }
            return res.status(404).json({state: 'Error', data: `Owner con ID ${id} no encontrado.`})
        } catch(err){
            return res.status(500).json({state:'Error', data: err.message})
        }
    }
}