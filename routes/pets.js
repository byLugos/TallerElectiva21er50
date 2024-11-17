const router = require('express').Router()
const verifyToken = require('../drivers/authMiddleware');
const {findAll, findById, save, deleteById, update, addAppointment} = require('../controllers/controllerPet')

//EndPoints

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Lista de Mascotas
 *     description: Retorna una colección de mascotas
 *     responses:
 *       '200':
 *         description: Respuesta satisfactoria.
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
 *                         description: ID de la mascota.
 *                         example: 7108277
 *                       name:
 *                         type: string
 *                         description: Nombre de la mascota.
 *                         example: Firulais
 *                       species:
 *                         type: string
 *                         description: Especie de la mascota.
 *                         example: Perro
 *                       race:
 *                         type: string
 *                         description: Raza de la mascota.
 *                         example: Labrador
 *                       date_of_birth:
 *                         type: string
 *                         format: date
 *                         description: Fecha de nacimiento de la mascota.
 *                         example: 2020-06-01
 *       '500':
 *         description: Error en el servidor.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error en el servidor."
 */
router.get('/',verifyToken, findAll)

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Obtener una Mascota por ID
 *     description: Retorna una mascota específica por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       '200':
 *         description: Respuesta satisfactoria.
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
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID de la mascota.
 *                       example: 7108277
 *                     name:
 *                       type: string
 *                       description: Nombre de la mascota.
 *                       example: Firulais
 *                     species:
 *                       type: string
 *                       description: Especie de la mascota.
 *                       example: Perro
 *                     race:
 *                       type: string
 *                       description: Raza de la mascota.
 *                       example: Labrador
 *                     date_of_birth:
 *                       type: string
 *                       format: date
 *                       description: Fecha de nacimiento de la mascota.
 *                       example: 2020-06-01
 *       '404':
 *         description: Mascota no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Mascota no encontrada.
 *       '500':
 *         description: Error en el servidor.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error en el servidor."
 */
router.get('/:id', verifyToken,findById)

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Crear una nueva Mascota
 *     description: Crea una nueva mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la mascota.
 *                 example: Firulais
 *               species:
 *                 type: string
 *                 description: Especie de la mascota.
 *                 example: Perro
 *               race:
 *                 type: string
 *                 description: Raza de la mascota.
 *                 example: Labrador
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento de la mascota.
 *                 example: 2020-06-01
 *     responses:
 *       '201':
 *         description: Mascota creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                   example: Mascota creada exitosamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID de la mascota creada.
 *                       example: 6108277
 *                     name:
 *                       type: string
 *                       description: Nombre de la mascota.
 *                       example: Firulais
 *                     species:
 *                       type: string
 *                       description: Especie de la mascota.
 *                       example: Perro
 *                     race:
 *                       type: string
 *                       description: Raza de la mascota.
 *                       example: Labrador
 *                     date_of_birth:
 *                       type: string
 *                       format: date
 *                       description: Fecha de nacimiento de la mascota.
 *                       example: 2020-06-01
 *       '400':
 *         description: Error en los datos enviados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Error en los datos enviados.
 *       '500':
 *         description: Error en el servidor.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error en el servidor."
 */
router.post('/', verifyToken,save)

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Eliminar una Mascota
 *     description: Elimina una mascota específica por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       '200':
 *         description: Mascota eliminada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: boolean
 *                   description: Estado de la operación.
 *                   example: true
 *                 data:
 *                   type: string
 *                   description: Mensaje indicando que la mascota fue eliminada.
 *                   example: Mascota eliminada correctamente
 *       '404':
 *         description: Mascota no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Mascota no encontrada.
 *       '500':
 *         description: Error en el servidor.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error en el servidor."
 */
router.delete('/:id',verifyToken, deleteById)

/**
 * @swagger
 * /pets/{id}:
 *   put:
 *     summary: Actualizar una Mascota
 *     description: Actualiza los datos de una mascota específica por su ID
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la mascota.
 *                 example: Firulais
 *               species:
 *                 type: string
 *                 description: Especie de la mascota.
 *                 example: Perro
 *               race:
 *                 type: string
 *                 description: Raza de la mascota.
 *                 example: Labrador
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento de la mascota.
 *                 example: 2020-06-01
 *     responses:
 *       '200':
 *         description: Mascota actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: string
 *                   description: Estado de la operación.
 *                   example: Success
 *                 data:
 *                   type: object
 *                   properties:
 *                     acknowledged:
 *                       type: boolean
 *                       description: Indica si la operación fue reconocida.
 *                       example: true
 *                     modifiedCount:
 *                       type: number
 *                       description: Número de documentos modificados.
 *                       example: 1
 *                     upsertedId:
 *                       type: string
 *                       description: ID generado si se creó un nuevo documento (upsert).
 *                       example: null
 *                     upsertedCount:
 *                       type: number
 *                       description: Número de documentos insertados.
 *                       example: 0
 *                     matchedCount:
 *                       type: number
 *                       description: Número de documentos que coinciden con los criterios de búsqueda.
 *                       example: 1
 *       '404':
 *         description: Mascota no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Mascota no encontrada.
 *       '500':
 *         description: Error en el servidor.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error en el servidor."
 */
router.put('/:id',verifyToken, update)

router.post('/:petId/appointments', verifyToken, addAppointment);

module.exports = router