/**
 * @swagger
 * definitions:
 *   Category:
 *     properties:
 *       category:
 *         type: string
 * 
 */

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     tags:
 *       - Categories
 *     description: Returns all categories
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: Categories's page no
 *         in: query
 *         required: false
 *         type: number
 *       - name: limit
 *         description: no. of item to display
 *         in: query
 *         required: false
 *         type: number
 *       - name: search
 *         description: Categories's category
 *         in: query
 *         required: false
 *         type: string
 *       - name: sort
 *         description: Sort column (id | category)
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
 *         description: An array of category
 *         schema:
 *           $ref: '#/definitions/Category'
 */

 /**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     tags:
 *       - Categories
 *     description: Add a category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: category parameters
 *         description: Category object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'
 *     responses:
 *       201:
 *         description: Added category
 */


/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     description: Updates a category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Category's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: Category
 *         description: Category object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'
 *     responses:
 *       200:
 *         description: Successfully updated
 */


/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     description: Returns a single category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Category's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single category
 *         schema:
 *           $ref: '#/definitions/Category'
 */