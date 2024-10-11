const router = require('express').Router()
const verifyToken = require('../drivers/authMiddleware');
const {findAll, findById, save, deleteById, update} = require('../controllers/controllerPet')

//EndPoints

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Obtiene todas las mascotas
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de mascotas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *       500:
 *         description: Error en el servidor
 */
router.get('/',verifyToken, findAll)

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Obtiene una mascota por su ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Mascota no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/:id', verifyToken,findById)

/**
 * @swagger
 * /pets/{id}:
 *   post:
 *     summary: Crea una nueva mascota para un propietario
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del propietario al que se le asignará la mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Mascota creada exitosamente.
 *       404:
 *         description: Propietario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/', verifyToken,save)

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Elimina una mascota por su ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota eliminada exitosamente.
 *       404:
 *         description: Mascota no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
router.delete('/:id',verifyToken, deleteById)

/**
 * @swagger
 * /pets/{id}:
 *   put:
 *     summary: Actualiza una mascota existente
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       200:
 *         description: Mascota actualizada exitosamente.
 *       404:
 *         description: Mascota no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
router.put('/:id',verifyToken, update)

module.exports = router