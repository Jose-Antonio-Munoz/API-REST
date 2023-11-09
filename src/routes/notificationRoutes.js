const notificationController=require('../controller/notificationController')
const {userAuth}=require('../auth')
const {idValidator, paginationMin,errorHandler}=require('../validators/validator')

const app=require('express')
const router=app.Router()

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     tags:
 *     - Notifications operations
 *     summary: Get notifications
 *     description: Retrieve a list of notifications.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number (optional).
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of notifications per page (optional).
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of notifications.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notifications:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Notification'
 *       401:
 *         description: Unauthorized request.
 *       500:
 *         description: error interno en el servidor
 */
router.get('/notifications',[paginationMin('page','limit'),errorHandler],userAuth,notificationController.getAllNotificationsByUser);
/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     tags:
 *     - Notifications operations
 *     summary: Get notification
 *     description: Retrieve one notification.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the notification.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: One notification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notifications:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/Notification'
 *       404:
 *         description: notificacion no encontrada.
 *       500:
 *         description: error interno en el servidor.
 */
router.get('/notifications/:id',[idValidator('id'),errorHandler],userAuth,notificationController.getOneNotificationByUser);
/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     tags:
 *     - Notifications operations
 *     summary: Delete One notification
 *     description: Delete One notification based on the id provided.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the notification.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description:
 *       404:
 *         description: notification no encontrada.
 *       500:
 *         description: error interno en el servidor.
 */
router.delete('/notifications/:id',[idValidator('id'),errorHandler],userAuth,notificationController.deleteOneNotification)
module.exports=router