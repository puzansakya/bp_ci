/**
 * @swagger
 * definitions:
 *   Article:
 *     properties:
 *       heading:
 *         type: string
 *       description:
 *         type: string
 *       content:
 *         type: string
 *       backdrop:
 *         type: string
 *       status:
 *         type: boolean
 * 
 */

  /**
 * @swagger
 * definitions:
 *   Clap:
 *     properties:
 *       article_id:
 *         type: number
 *       user_id:
 *         type: number
 *       clap:
 *         type: boolean 
 * 
 */

/**
 * @swagger
 * /api/v1/articles:
 *   get:
 *     tags:
 *       - Articles
 *     description: Returns all articles
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         description: Article's heading
 *         in: query
 *         required: false
 *         type: string
 *       - name: sort
 *         description: Sort column
 *         in: query
 *         required: false
 *         type: string
 *       - name: order
 *         description: Sort type (asc | desc)
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: An array of articles
 *         schema:
 *           $ref: '#/definitions/Article'
 */

/**
 * @swagger
 * /api/v1/articles/{slug}:
 *   get:
 *     tags:
 *       - Articles
 *     description: Returns a single article
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: slug
 *         description: Article's slug
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single article
 *         schema:
 *           $ref: '#/definitions/Article'
 */


/**
 * @swagger
 * /api/v1/articles:
 *   post:
 *     tags:
 *       - Articles
 *     description: Create new article
 *     summary: uploads an image
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: heading
 *         in: formData
 *         description: Article's heading
 *         required: true
 *         type: string
 *       - name: slug
 *         in: formData
 *         description: Article's slug
 *         required: true
 *         type: string
 *       - name: description
 *         in: formData
 *         description: Article's description
 *         required: true
 *         type: string
 *       - name: status
 *         in: formData
 *         description: Article's status
 *         required: true
 *         type: boolean
 *       - name: content
 *         in: formData
 *         description: Article's content
 *         required: true
 *         type: string
 *       - name: backdrop
 *         in: formData
 *         description: Article's backdrop
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: An array of articles
 *     security:
 *       - jwt: []
 */


 /**
 * @swagger
 * /api/v1/articles/clap:
 *   post:
 *     tags:
 *       - Articles
 *     description: clap an article
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Article clap parameters
 *         description: Clap object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Clap'
 *     responses:
 *       201:
 *         description: claped
 */