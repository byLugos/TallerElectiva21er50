const router = require('express').Router()
const verifyToken = require('../drivers/authMiddleware');
const {findAll, findById, save, deleteById, update} = require('../controllers/controllerOwner')

/**
 * @swagger
 * /owners:
 *   get:
 *     summary: Obtiene todos los propietarios
 *     tags: [Owners]
 *     responses:
 *       200:
 *         description: Lista de propietarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Owner'
 *       500:
 *         description: Error en el servidor
 */
router.get('/',verifyToken, findAll)

/**
 * @swagger
 * /owners/{id}:
 *   get:
 *     summary: Obtiene un propietario por su ID
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del propietario
 *     responses:
 *       200:
 *         description: Propietario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       404:
 *         description: Propietario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/:id',verifyToken, findById)

/**
 * @swagger
 * /owners:
 *   post:
 *     summary: Crea un nuevo propietario
 *     tags: [Owners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     responses:
 *       201:
 *         description: Propietario creado exitosamente.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/', verifyToken,save)
/**
 * @swagger
 * /owners/{id}:
 *   delete:
 *     summary: Elimina un propietario por su ID
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del propietario
 *     responses:
 *       200:
 *         description: Propietario eliminado exitosamente.
 *       404:
 *         description: Propietario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.delete('/:id',verifyToken, deleteById)

/**
 * @swagger
 * /owners/{id}:
 *   put:
 *     summary: Actualiza un propietario existente
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del propietario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     responses:
 *       200:
 *         description: Propietario actualizado exitosamente.
 *       404:
 *         description: Propietario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.put('/:id',verifyToken, update)

module.exports = router