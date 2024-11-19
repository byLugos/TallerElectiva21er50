const Owner = require('../models/Owner')
const Pet = require('../models/Pet')
module.exports = {
    'findAll': async (req, res) => {
        try {
            const result = await Owner.find({}).populate('pets'); // Asegura el populate
            return res.status(200).json({ state: 'Success', data: result });
        } catch (err) {
            return res.status(500).json({ state: 'Error', data: err.message });
        }
    },
    'findById': async (req, res) => {
        const { id } = req.params;

        try {
            const owner = await Owner.findById(id).populate('pets'); // Agrega populate para cargar los datos de las mascotas
            if (!owner) {
                return res.status(404).json({ state: false, message: 'Propietario no encontrado' });
            }

            return res.status(200).json({ state: true, data: owner });
        } catch (err) {
            return res.status(500).json({ state: false, message: 'Error en el servidor', error: err.message });
        }
    },
    'save': async (req, res) => {
        try {
            const { name, phone, email, pets, ...ownerData } = req.body;

            // Validar que se hayan enviado mascotas
            if (!pets || pets.length === 0) {
                return res.status(400).json({ state: false, message: 'El dueño debe tener al menos una mascota' });
            }

            // Validar que el teléfono sea una cadena
            if (typeof phone !== 'string') {
                return res.status(400).json({ state: false, message: 'El teléfono debe ser una cadena de texto.' });
            }

            // Verificar duplicados de nombre, teléfono o correo electrónico
            const existingName = await Owner.findOne({ name });
            if (existingName) {
                return res.status(400).json({ state: false, message: 'El nombre del propietario ya existe. Debes elegir otro nombre.' });
            }

            const existingPhone = await Owner.findOne({ phone });
            if (existingPhone) {
                return res.status(400).json({ state: false, message: 'El número de teléfono ya está registrado. Debes proporcionar otro número.' });
            }

            const existingEmail = await Owner.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ state: false, message: 'El correo electrónico ya está registrado. Debes proporcionar otro correo.' });
            }

            // Verificar conflictos de mascotas
            const conflictingOwners = await Owner.find({ pets: { $in: pets } });
            if (conflictingOwners.length > 0) {
                return res.status(400).json({
                    state: false,
                    message: 'Una o más mascotas ya están asignadas a otro propietario.'
                });
            }

            // Verificar que las mascotas existan
            const foundPets = await Pet.find({ _id: { $in: pets } });
            if (foundPets.length !== pets.length) {
                return res.status(404).json({ state: false, message: 'Algunas mascotas no se encontraron' });
            }

            // Crear y guardar el dueño
            const owner = new Owner({
                name,
                phone,
                email,
                pets: foundPets.map(pet => pet._id),
                ...ownerData
            });

            const result = await owner.save();

            // Usar populate para incluir los datos completos de las mascotas
            const populatedOwner = await Owner.findById(result._id).populate('pets');
            return res.status(201).json({ state: true, data: populatedOwner });
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
        try {
            const { id } = req.params; // Asegúrate de usar 'id' o '_id', según cómo lo envíes.
            const { name, phone, email, pets } = req.body; // Extrae las propiedades necesarias.

            // Valida si `phone` está presente y es del tipo correcto.
            if (phone && typeof phone !== 'string') {
                return res.status(400).json({ state: false, message: 'El teléfono debe ser una cadena de texto.' });
            }

            // Busca el dueño por su ID.
            const ownerExists = await Owner.findById(id);
            if (!ownerExists) {
                return res.status(404).json({ state: false, message: `Owner con ID ${_id} no encontrado.` });
            }

            // Si `pets` está presente, valida que existan.
            if (pets) {
                const foundPets = await Pet.find({ _id: { $in: pets } });
                if (foundPets.length !== pets.length) {
                    return res.status(404).json({ state: false, message: 'Algunas mascotas no se encontraron.' });
                }
            }

            // Actualiza el dueño y devuelve la información actualizada con populate.
            const updatedOwner = await Owner.findByIdAndUpdate(
                id,
                { name, phone, email, pets },
                { new: true } // Devuelve el documento actualizado.
            ).populate('pets');

            return res.status(200).json({ state: true, data: updatedOwner });
        } catch (err) {
            console.error("Error en update del backend:", err.message);
            return res.status(500).json({ state: false, message: 'Error en el servidor', error: err.message });
        }
    }
}