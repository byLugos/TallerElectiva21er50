const router = require('express').Router();
const verifyToken = require('../drivers/authMiddleware'); 
const { findAll, findById, save, deleteById, update } = require('../controllers/controllerAppointment'); 

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Lista todas las citas
 *     description: Retorna una colección de citas
 *     responses:
 *       '200':
 *         description: Lista de citas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: string
 *                   description: Estado de la consulta.
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID de la cita.
 *                       pet_id:
 *                         type: string
 *                         description: ID de la mascota.
 *                       date_time:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de la cita.
 *                       reason:
 *                         type: string
 *                         description: Razón de la cita.
 *                       status:
 *                         type: string
 *                         description: Estado de la cita.
 *                       notes:
 *                         type: string
 *                         description: Notas adicionales.
 */
router.get('/', verifyToken, findAll);

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Obtener una cita por ID
 *     description: Retorna una cita específica por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la cita
 *     responses:
 *       '200':
 *         description: Cita obtenida exitosamente.
 *       '404':
 *         description: Cita no encontrada.
 */
router.get('/:id', verifyToken, findById);

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Crear una nueva cita
 *     description: Crea una nueva cita para una mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pet_id:
 *                 type: string
 *                 description: ID de la mascota.
 *               date_time:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de la cita.
 *               reason:
 *                 type: string
 *                 description: Razón de la cita.
 *     responses:
 *       '201':
 *         description: Cita creada exitosamente.
 */
router.post('/', verifyToken, save);

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Eliminar una cita
 *     description: Elimina una cita específica por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la cita
 *     responses:
 *       '200':
 *         description: Cita eliminada exitosamente.
 */
router.delete('/:id', verifyToken, deleteById);

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Actualizar una cita
 *     description: Actualiza los datos de una cita específica por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la cita
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date_time:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de la cita.
 *               reason:
 *                 type: string
 *                 description: Razón de la cita.
 *               status:
 *                 type: string
 *                 description: Estado de la cita.
 *               notes:
 *                 type: string
 *                 description: Notas adicionales.
 *     responses:
 *       '200':
 *         description: Cita actualizada exitosamente.
 */
router.put('/:id', verifyToken, update);

module.exports = router;
