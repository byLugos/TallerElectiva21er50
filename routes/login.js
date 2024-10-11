const router = require("express").Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Inicio de sesión
 *     description: Autenticar a un usuario y generar un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario.
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: 123456
 *     responses:
 *       '200':
 *         description: Autenticación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de autenticación exitosa.
 *                   example: Autenticado correctamente
 *                 token:
 *                   type: string
 *                   description: Token JWT generado.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '401':
 *         description: Credenciales inválidas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Credenciales inválidas
 *       '500':
 *         description: Error en el servidor.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error en el servidor."
 */
router.post("/login", authController.login);

module.exports = router;
