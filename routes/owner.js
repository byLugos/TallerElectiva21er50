const router = require('express').Router()
const verifyToken = require('../drivers/authMiddleware');
const {findAll, findById, save, deleteById, update} = require('../controllers/controllerOwner')

/**
 * @swagger
 * /owners:
 *   get:
 *     summary: Lista de Propietarios
 *     description: Retorna una colección de propietarios
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
 *                         description: ID del propietario.
 *                         example: 6108277
 *                       name:
 *                         type: string
 *                         description: Nombre del propietario.
 *                         example: Juan Pérez
 *                       gender:
 *                         type: string
 *                         description: Género del propietario.
 *                         example: Masculino
 *                       phone:
 *                         type: number
 *                         description: Teléfono del propietario.
 *                         example: 1234567890
 *                       email:
 *                         type: string
 *                         description: Email del propietario.
 *                         example: juan.perez@example.com
 *                       pets:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               description: ID de la mascota.
 *                               example: 7108277
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
 * /owners/{id}:
 *   get:
 *     summary: Obtener un Propietario por ID
 *     description: Retorna un propietario específico por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del propietario
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
 *                         description: ID del propietario.
 *                         example: 6108277
 *                       name:
 *                         type: string
 *                         description: Nombre del propietario.
 *                         example: Juan Pérez
 *                       gender:
 *                         type: string
 *                         description: Género del propietario.
 *                         example: Masculino
 *                       phone:
 *                         type: number
 *                         description: Teléfono del propietario.
 *                         example: 1234567890
 *                       email:
 *                         type: string
 *                         description: Email del propietario.
 *                         example: juan.perez@example.com
 *                       pets:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               description: ID de la mascota.
 *                               example: 7108277
 *       '401':
 *         description: Propietario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Propietario no encontrado
 *       '500':
 *         description: Error en el servidor.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error en el servidor."
 */
router.get('/:id',verifyToken, findById)

/**
 * @swagger
 * /owners:
 *   post:
 *     summary: Crear un nuevo Propietario
 *     description: Crea un nuevo propietario con sus respectivas mascotas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del propietario.
 *                 example: Juan Pérez
 *               gender:
 *                 type: string
 *                 description: Género del propietario.
 *                 example: Masculino
 *               phone:
 *                 type: number
 *                 description: Teléfono del propietario.
 *                 example: 1234567890
 *               email:
 *                 type: string
 *                 description: Email del propietario.
 *                 example: juan.perez@example.com
 *               pets:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: ID de la mascota.
 *                   example: 7108277
 *     responses:
 *       
 *       '201':
 *         description: Propietario creado con éxito.
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
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Nombre del propietario creado.
 *                       example: Silvana
 *                     gender:
 *                       type: string
 *                       description: Género del propietario.
 *                       example: Female
 *                     phone:
 *                       type: number
 *                       description: Teléfono del propietario.
 *                       example: 123333777
 *                     email:
 *                       type: string
 *                       description: Email del propietario.
 *                       example: silvana@exampleee.com
 *                     pets:
 *                       type: array
 *                       items:
 *                         type: string
 *                         description: IDs de las mascotas asociadas al propietario.
 *                         example: "670995a3cda479fd47562b36"
 *                     _id:
 *                       type: string
 *                       description: ID del propietario recién creado.
 *                       example: 6709a19b89b03bbbae4de89c
 *                     __v:
 *                       type: number
 *                       description: Versión del documento en la base de datos.
 *                       example: 0
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
 * /owners/{id}:
 *   delete:
 *     summary: Eliminar un Propietario
 *     description: Elimina un propietario específico por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del propietario
 *     responses:
 *       '200':
 *         description: Propietario eliminado con exito
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
 *                   description: Mensaje indicando que el propietario fue eliminado.
 *                   example: Propietario eliminado con exito
 *       '404':
 *         description: Propietario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Propietario no encontrado.
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
 * /owners/{id}:
 *   put:
 *     summary: Actualizar un Propietario
 *     description: Actualiza los datos de un propietario específico por su ID
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del propietario.
 *                 example: Juan Pérez
 *               gender:
 *                 type: string
 *                 description: Género del propietario.
 *                 example: Masculino
 *               phone:
 *                 type: number
 *                 description: Teléfono del propietario.
 *                 example: 1234567890
 *               email:
 *                 type: string
 *                 description: Email del propietario.
 *                 example: juan.perez@example.com
 *               pets:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: ID de la mascota.
 *                   example: 7108277
 *     responses:
 *       '200':
 *         description: Propietario actualizado con éxito.
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
 *       '401':
 *         description: Propietario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Propietario no encontrado.
 *       '500':
 *         description: Error en el servidor.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error en el servidor."
 */
router.put('/:id',verifyToken, update)

module.exports = router