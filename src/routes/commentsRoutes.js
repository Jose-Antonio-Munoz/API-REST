const comments =require('../controller/commentsController');
const express =require('express');
const {userAuth}=require('../auth');
const {commentsValidator}=require('../validators/commentsValidator')
const {idValidator, paginationMin,errorHandler}=require('../validators/validator')

const router=express.Router()
/**
 * @swagger
 * /api/comments:
 *   get:
 *     tags:
 *     - Comments operations
 *     summary: Get all comments 
 *     description: Retrieve a list of commets showing them from the most recent.
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
 *         description: Number of comments per page (optional).
 *         schema:
 *           type: integer
 *       - in: query
 *         name: textQuery
 *         required: false
 *         description: allows to filter comments based on those that contain the provided text.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of comments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   
 *       500:
 *         description: internal server error.
 */
router.get('/comments',[paginationMin('page','limit'),errorHandler],userAuth,comments.getAllComments); 
/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     tags:
 *     - Comments operations
 *     summary: Get one comments 
 *     description: Retrieve a espcific commet based on the id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: comment Id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: One comment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *       404:
 *         description: comentario no encontrado.          
 *       500:
 *         description: internal server error.
 */
router.get('/comments/:id',[idValidator('id'),errorHandler],userAuth,comments.getOneComment)
/**
 * @swagger
 * /api/comments/usuario/{id}:
 *   get:
 *     tags:
 *     - Comments operations
 *     summary: Gets all comments created by a especific user
 *     description: Retrieve a list of comments by a specific user based on the id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: user Id
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number (optional).
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of comments per page (optional).
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: todos los comentarios asociados al id del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   
 *       500:
 *         description: internal server error.
 */
router.get('/comments/usuario/:id',[paginationMin('page','limit'),idValidator('id'),errorHandler],userAuth,comments.getAllCommentsByAuthor)
/**
 * @swagger
 * /api/comments/posts/{id}:
 *   get:
 *     tags:
 *     - Comments operations
 *     summary: Gets all comments by post id
 *     description: Retrieves a list of comments associated with the specific post base in post_id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: post Id
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number (optional).
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of comments per page (optional).
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todos los comentarios asociados con el post id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   
 *       500:
 *         description: internal server error.
 */
router.get('/comments/posts/:id',[paginationMin('page','limit'),idValidator('id'),errorHandler],userAuth,comments.getAllCommentsByPost)
/**
 * @swagger
 * /api/comments:
 *   post:
 *     tags:
 *     - Comments operations
 *     summary: Create a new comment and the related notification to the post author
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       description: Comment data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               post_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment and notification created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: error interno en el servidor
 */
router.post('/comments',[commentsValidator,errorHandler],userAuth,comments.createOneComment);
/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     tags:
 *     - Comments operations
 *     summary: Delete a comment by ID
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: 
 *       403:
 *         description: error,no eres el autor del comentario
 *       404:
 *         description: error,no se ha encontrado un comentario con el id proporcionado
 *       500:
 *         description: error interno en el servidor
 */
router.delete('/comments/:id',[idValidator('id'),errorHandler],userAuth,comments.deleteOneComment);
/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     tags:
 *     - Comments operations
 *     summary: Change comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: comment Id
 *         schema:
 *           type: string
 *     requestBody:
 *       description: allows editing the content of the comment based on the id provided
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The new text 
 *     responses:
 *       200:
 *         description: comentario modificado satisfactoriamente
 *       403:
 *         description: error, no eres el autor del comentario
 *       404:
 *         description: error, no se ha encontrado un comentario con el id proporcionado
 *       500:
 *         description: error interno en el servidor
 */
router.put('/comments/:id',[idValidator('id'),errorHandler],userAuth,comments.updateComment)
module.exports=router