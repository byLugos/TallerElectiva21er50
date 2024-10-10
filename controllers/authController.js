const jwt = require('jsonwebtoken');
const authController = {
    login: (req, res) => {
        const { id, name } = req.body;
        if (id == process.env.ID && name == process.env.USER) {
            const user = { id, name }; 
            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({
                message: 'Autenticado correctamente',
                token: token
            });
        } else {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            });
        }
    }
};
module.exports = authController;
