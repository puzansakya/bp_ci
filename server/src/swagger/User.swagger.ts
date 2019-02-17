/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string         
 */

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - Users
 *     description: Login user to the system
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: Login of user
 */


 /**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     tags:
 *       - Users
 *     description: Sign up user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: Login of user
 */
