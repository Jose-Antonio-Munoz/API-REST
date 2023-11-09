const express=require('express')
const router=express.Router()
const postsController=require('../controller/postsController')
const {userAuth}=require('../auth');
const {idValidator, paginationMin,errorHandler}=require('../validators/validator')
const {postValidator}=require('../validators/postValidators')
const {cacheMiddleware}=require('../cache/cacheMiddleware')

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags:
 *     - Post operations
 *     summary: Get all posts per page
 *     description: Retrieve a list of posts.
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
 *       - in: query
 *         name: titleQuery
 *         required: false
 *         description: allows to filter posts based on those that contain the provided text in their title.
 *         schema:
 *           type: string
 *       - in: query
 *         name: contentQuery
 *         required: false
 *         description: allows to filter posts based on those that contain the provided text in their content.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *       500:
 *         description: internal server error.
 */
router.get('/posts',[paginationMin('page','limit'),errorHandler],userAuth,cacheMiddleware,postsController.getAllPosts); 
/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     tags:
 *     - Post operations
 *     summary: Get one post by id
 *     description: Retrieve one post acording the id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to show.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: one post.
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
router.get('/posts/:id',[idValidator('id'),errorHandler],userAuth,postsController.getOnePostById)
/**
 * @swagger
 * /api/posts/author/{id}:
 *   get:
 *     tags:
 *     - Post operations
 *     summary: Get all posts by author id
 *     description: Retrieve all posts by author id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the author.
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
 *         description: Number of elements per page (optional).
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: all author post by id.
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
router.get('/posts/author/:id',[paginationMin('page','limit'),idValidator('id'),errorHandler],userAuth,postsController.getAllPostsByAuthor)
/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags:
 *     - Post operations
 *     summary: Create a new posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Post data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: post created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 author_id:
 *                   type: string
 *                 authorUsuario:
 *                   type: string
 *                 created:
 *                   type: string
 *       500:
 *         description: error interno en el servidor
 */
router.post('/posts',[postValidator,errorHandler],userAuth,postsController.createPost);
/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     tags:
 *     - Post operations
 *     summary: Delete a post by ID and all comments associated with the post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the posts to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description:
 *       403:
 *         description: error, no eres el autor del post
 *       404:
 *         description: error, post no encontrado
 *       500:
 *         description: error interno en el servidor
 */
router.delete('/posts/:id',[idValidator('id'),errorHandler],userAuth,postsController.deletePost);
/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     tags:
 *     - Post operations
 *     summary: Change post title and content
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the posts to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       description: allows editing the title and content of the post that matches id provided
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title
 *               content:
 *                 type: string
 *                 description: The new content 
 *     responses:
 *       200:
 *         description: Post 
 *       401:
 *         description: post no encontrado
 *       403:
 *         description: no eres el autor del post
 *       500:
 *         description: error interno en el servidor
 */
router.put('/posts/:id',[idValidator('id'),errorHandler],userAuth,postsController.updatePost)

module.exports=router