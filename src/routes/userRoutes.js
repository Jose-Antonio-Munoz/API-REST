const express=require('express');
const router=express.Router();
const usuario=require('../controller/userController')
const {cacheMiddleware}=require('../cache/cacheMiddleware')
const {userAuth}=require('../auth');

const {newUserValidator,userLogin,atLeatsOneUpdate,oldpasswordExist}= require('../validators/userValidators')
const {idValidator,errorHandler,paginationMin}=require('../validators/validator')


/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     tags:
 *     - Users operations
 *     summary: Get all users per page
 *     description: Retrieve a list of users.
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
 *         description: Number of elements per page (optional).
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *       500:
 *         description: error interno en el servidor.
 */
router.get('/usuarios',[paginationMin('page','limit'),errorHandler],cacheMiddleware,userAuth,usuario.getAllUsers)
/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     tags:
 *     - Users operations
 *     summary: Get a user based on the provided id
 *     description: Retrieve One user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: One user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *       404:
 *         description: usuario no encontrado
 *       500:
 *         description: error interno en el servidor.
 */
router.get('/usuarios/:id',[idValidator('id'),errorHandler],userAuth,usuario.getUser)
/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     tags:
 *     - Users operations
 *     summary: Create a new user
 *     requestBody:
 *       description: user data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: el usuario 'userExample' con el correo 'email@hotmail.com' ha sido registrado satisfactoriamente
 *       500:
 *         description: error interno en el servidor.
 */
router.post('/usuarios',[newUserValidator,errorHandler],usuario.createOneUser)
/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *     - Users operations
 *     summary: User Login
 *     description: Authenticate a user with email and password.
 *     requestBody:
 *       description: User credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's plain text password.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string.
 *                   description: Indica el éxito del inicio de sesión.
 *                 user_id:
 *                   type: string.
 *                   description: indica el id del usuario registrado
 *                 token:
 *                   type: string.
 *                   description: Token de autenticación para el usuario.
 *       401:
 *         description: Los datos no coinciden con ningun usuario registrado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: error interno en el servidor.
 */
router.post('/login',[userLogin,errorHandler],usuario.loginUser)
/**
 * @swagger
 * /api/usuarios/:
 *   put:
 *     tags:
 *     - Users operations
 *     summary: Change user password or/and username
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Password and/or username change request
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The current (old) password
 *               newPassword:
 *                 type: string
 *                 description: The new password
 *               newUsuario:
 *                 type: string
 *                 description: The new password
 *     responses:
 *       200:
 *         description: se han aplicado los cambios al usuario 'usuarioExample'
 *       401:
 *         description: No autorizado, la contraseña proveida no coincide con su contraseña actual
 *       404:
 *         description: usuario no encontrado
 *       500:
 *         description: error interno en el servidor.
 */
router.put('/usuarios',[oldpasswordExist,errorHandler],atLeatsOneUpdate,userAuth,usuario.updateUser)


module.exports=router