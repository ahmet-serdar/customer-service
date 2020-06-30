const express = require('express')
const { checkSchema } = require("express-validator")
const { schemaErrorHandler, controllerAdapter, auth } = require('../../middlewares')
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
 *     summary: "Add a new customer to store"
 *     description: 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         description: Bearer Authentication Token (It will be written as "Bearer + space + idToken" )
 *         in: header
 *         type: string
 *         required: true
 *       - name: customer 
 *         in: body
 *         description: Firstname and Lastname are required and must be min 1 letter.
 *                      isIndividual must be boolean or null
 *                      Phones is not required. Phones can be empty array. if phone exist, so must be string and phone type id must be one of "home", "work" or "mobile"
 *         required: true
 *         example: {                    
 *                    "firstName": string,
 *                    "lastName": string,
 *                    "isIndividual": true,
 *                    "address": [ {
 *                                  "firstLine": "string",
 *                                   "secondLine": "string",
 *                                   "thirdLine": "string",
 *                                   "town": "string",
 *                                   "city": "string",
 *                                   "postCode": "string"
 *                               }],
 *                    "phones": {
 *   	                    "phone": "123 123 1234",
 *                       	"phoneTypeId":"work"
 *                              },
 *                    "email": "testemail@test.com" 
 *                  }
 *         
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
 *       401:
 *         description: Unauthorized Error
 *         schema: 
 *           type: string
 *           example: "Authentication failed! Try again." 
 *       422: 
 *          description: Unprocessable Entity
 *          schema:
 *            type: object
 *            example: {
 *                       "code": "422",
 *                       "message": {
 *                                    "firstName": {
 *                                        "msg": "First name cannot be empty",
 *                                        "param": "firstName",
 *                                        "location": "body"
 *                                                 }
 *                                 },
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
 * /customers?skip=0&limit=10:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Get all customers
 *     description: Returns all customers
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         description: Bearer Authentication Token (It will be written as "Bearer + space + idToken" )
 *         in: header
 *         type: string
 *         required: true
 *       - in: query
 *         name: skip
 *         type: integer
 *         description: The number of pages to skip before starting to collect the result set.
 *       - in: query
 *         name: limit
 *         type: integer
 *         description: The numbers of customers to return.
 *     responses:
 *       200:
 *         description: An array of customers and number of all customers in the database
 *       401:
 *         description: Unauthorized Error
 *         schema: 
 *           type: string
 *           example: "Authentication failed! Try again."    
 *            
 */
//#endregion
router.get('/', checkSchema(validations.list), schemaErrorHandler(), controllerAdapter(customerControllerInstance, 'list'))


//#region [swagger: /customers/{id} - GET]
/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Find customer by ID
 *     description: Returns a single customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         description: Bearer Authentication Token (It will be written as "Bearer + space + idToken" )
 *         in: header
 *         type: string
 *         required: true
 *       - id: id
 *         in: path
 *         description: Enter valid ID to retrieve customer details
 *         name: id
 *         type: string
 *         format: hexadecimel
 *         required: true
 *         
 *     responses:
 *       200:
 *         description: Succesfull response
 *       401:
 *         description: Unauthorized Error
 *         schema: 
 *           type: string
 *           example: "Authentication failed! Try again."         
 *       404:
 *         description: Customer Not Found
 *         
 *       400:
 *         description: Bad Request
 *         
 */
//#endregion
router.get('/:id', checkSchema(validations.get), schemaErrorHandler(),controllerAdapter(customerControllerInstance, 'get'))


//#region [swagger: /customers/{id} - PATCH]
/**
 * @swagger
 * /customers/{id}:
 *   patch:
 *     tags:
 *       - Customer
 *     summary: Update a customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         description: Bearer Authentication Token (It will be written as "Bearer + space + idToken" )
 *         in: header
 *         type: string
 *         required: true
 *       - id: id
 *         description: Enter valid ID
 *         name: id
 *         type: string
 *         format: hexadecimal
 *         in: path
 *         required: true
 *      
 *       - name: update body
 *         description: Valid updates are  'firstName', 'lastName', 'isIndividual', 'address', 'phones', 'email'
 *         in: body
 *         type: object
 *         required: true
 *         example: {                    
 *                    "firstName": string,
 *                    "lastName": string,
 *                    "isIndividual": true,
 *                    "address": [],
 *                    "phones": {
 *   	                    "phone": "123 456 789",
 *                       	"phoneTypeId":"work"
 *                              },
 *                    "email": "testemail@test.com" 
 *                  }
 *     responses:
 *       200:
 *         description: Succesfull response
 *       401:
 *         description: Unauthorized Error
 *         schema: 
 *           type: string
 *           example: "Authentication failed! Try again." 
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


//#region [swagger: /customers/{id} - DELETE]
/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     tags:
 *       - Customer
 *     summary: Delete a customer
 *     description: Soft delete a customer. Only sets current date to deletedAt.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         description: Bearer Authentication Token (It will be written as "Bearer + space + idToken" )
 *         in: header
 *         type: string
 *         required: true
 *       - id: id
 *         description: Enter valid ID
 *         name: id
 *         type: string
 *         format: string
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Succesfull response
 *       401:
 *         description: Unauthorized Error
 *         schema: 
 *           type: string
 *           example: "Authentication failed! Try again." 
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
