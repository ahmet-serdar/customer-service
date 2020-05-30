const express = require('express')
const { checkSchema } = require("express-validator")
const { schemaErrorHandler, controllerAdapter } = require('../../middlewares')
const validations = require("./validations")
const customerControllerInstance = require('./CustomerController')


const router = new express.Router()


//#region [swagger: /customers - POST]
/**
 * @swagger
 * path:
 *  /customers:
 *    post:
 *     tags:
 *       - Customer
 *     description: Creates a new Customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customer 
 *         in: body
 *         description: Customer object
 *         required: true
 *         example: {
 *                    "_id": ObjectId,
 *                    "firstName": string,
 *                    "lastName": string,
 *                    "isIndividual": boolean,
 *                    "deleted": false,
 *                    "address": array,
 *                    "phones": array,
 *                    "email": string,
 *                    "createdAt": date,
 *                    "updatedAt": date,
 *                    "createdBy": string      
 *                  }
 *       - schema:
 *           $ref: '#/repositories/customer'
 *     responses:
 *       201:
 *         description: Successfull response
 *         schema:
 *            type: object
 *            example: {
 *                       "id": ObjectId,
 *                       "code": "201",
 *                       "message": "Created",
 *                       "timestamp": date
 *                      }
 *       422: 
 *          description: Unprocessable Entity
 *          schema:
 *            type: object
 *            example: {
 *                       "code": "422",
 *                       "message": "",
 *                       "timestamp": date
 *                      }
 *       500:
 *         description: Error
 *         schema: 
 *           type: string
 *           example: "Could not add Customer"            
             
 */
//#endregion

router.post("/", checkSchema(validations.create), schemaErrorHandler(), controllerAdapter(customerControllerInstance, 'create'))

//#region [swagger: /customers - GET]
/**
 * @swagger
 * /customers:
 *   get:
 *     tags:
 *       - Customers
 *     description: Returns all customers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of customers
 *        
 *            
 */
//#endregion
router.get('/', checkSchema(validations.list), schemaErrorHandler(), controllerAdapter(customerControllerInstance, 'list'))


//#region [swagger: /customers/:id - GET]
/**
 * @swagger
 * /customers/:id:
 *   get:
 *     tags:
 *       - Customer
 *     description: Returns the customer with id
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: id
 *         description: Customer id
 *         in: query
 *         required: true
 *         
 *     responses:
 *       200:
 *         description: Succesfull response
 *         
 *       404:
 *         description: Customer Not Found
 *         
 *       400:
 *         description: Bad Request
 *         
 */
//#endregion
router.get('/:id', checkSchema(validations.get), schemaErrorHandler(),controllerAdapter(customerControllerInstance, 'get'))


//#region [swagger: /customers/:id - PATCH]
/**
 * @swagger
 * /customers/:id:
 *   patch:
 *     tags:
 *       - Customer
 *     description: Update the customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: id
 *         description: Customer id
 *         in: query
 *         required: true
 *      
 *       - name: updates
 *         description: Updates
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/repositories/Customers'
 *     responses:
 *       200:
 *         description: Succesfull response
 *         
 *       404:
 *         description: Customer Not Found
 *         
 *       400:
 *         description: Bad Request
 *         
 */
//#endregion
router.patch('/:id', checkSchema(validations.update), schemaErrorHandler(), controllerAdapter(customerControllerInstance, 'update'))


//#region [swagger: /customers/:id - DELETE]
/**
 * @swagger
 * /customers/:id:
 *   delete:
 *     tags:
 *       - Customer
 *     description: Delete the customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: id
 *         description: Customer id
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Succesfull response
 *         
 *       404:
 *         description: Customer Not Found
 *         
 *       400:
 *         description: Bad Request
 *         
 *
 */
//#endregion
router.delete('/:id', checkSchema(validations.delete), schemaErrorHandler(), controllerAdapter(customerControllerInstance, 'delete'))


module.exports = router;
