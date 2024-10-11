const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const User = require('../models/User'); 

const authController = {

    login: async (req, res) => {

        const { email, password } = req.body;
        
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }
            const token = jwt.sign(
                { email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.json({
                message: 'Autenticado correctamente',
                token: token
            });

        } catch (err) {
            return res.status(500).json({ message: 'Error en el servidor', error: err.message });
        }
    }
};
module.exports = authController;
