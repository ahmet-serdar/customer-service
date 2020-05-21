import express from 'express'
import { checkSchema } from "express-validator";
import { schemaErrorHandler, controllerAdapter } from '../../middlewares'
import validations from "./validations";
import customerControllerInstance from './CustomerController'


const router = new express.Router()


//#region [swagger: /customers - POST]
/**
 * @swagger
 * path:
 *  /customers:
 *    post:
 *     tags:
 *       - Customers
 *     description: Creates a new Customers
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Customers name
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/src/repositories/customer'
 *       - address: address
 *         description: Customers address
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Customers'
 *     responses:
 *       200:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/Customers'
 */
//#endregion

router.post("/", checkSchema(validations.create), schemaErrorHandler(), controllerAdapter(customerControllerInstance, 'create'))

//#region [swagger: /customers - GET]
/**
 * @swagger
 * /customers:
 *   get:
 *     tags:
 *       - Customer
 *     description: Returns all customer names
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
 *       - Customers
 *     description: Returns a Customers
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: id
 *         description: Customers id
 *         in: query
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Customers'
 *     responses:
 *       200:
 *         description: A Customers
 *         schema:
 *           $ref: '#/definitions/Customers'
 */
//#endregion

router.get('/:id', checkSchema(validations.get), schemaErrorHandler(),controllerAdapter(customerControllerInstance, 'get'))

router.patch('/:id', checkSchema(validations.update), schemaErrorHandler(), controllerAdapter(customerControllerInstance, 'update'))

router.delete('/:id', checkSchema(validations.delete), schemaErrorHandler(), controllerAdapter(customerControllerInstance, 'delete'))


module.exports = router;
