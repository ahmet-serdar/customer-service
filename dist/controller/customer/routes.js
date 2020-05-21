"use strict";

var _express = _interopRequireDefault(require("express"));

var _expressValidator = require("express-validator");

var _middlewares = require("../../middlewares");

var _validations = _interopRequireDefault(require("./validations"));

var _CustomerController = _interopRequireDefault(require("./CustomerController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _express["default"].Router(); //#region [swagger: /customers - POST]

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

router.post("/", (0, _expressValidator.checkSchema)(_validations["default"].create), (0, _middlewares.schemaErrorHandler)(), (0, _middlewares.controllerAdapter)(_CustomerController["default"], 'create')); //#region [swagger: /customers - GET]

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

router.get('/', (0, _expressValidator.checkSchema)(_validations["default"].list), (0, _middlewares.schemaErrorHandler)(), (0, _middlewares.controllerAdapter)(_CustomerController["default"], 'list')); //#region [swagger: /customers/:id - GET]

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

router.get('/:id', (0, _expressValidator.checkSchema)(_validations["default"].get), (0, _middlewares.schemaErrorHandler)(), (0, _middlewares.controllerAdapter)(_CustomerController["default"], 'get'));
router.patch('/:id', (0, _expressValidator.checkSchema)(_validations["default"].update), (0, _middlewares.schemaErrorHandler)(), (0, _middlewares.controllerAdapter)(_CustomerController["default"], 'update'));
router["delete"]('/:id', (0, _expressValidator.checkSchema)(_validations["default"]["delete"]), (0, _middlewares.schemaErrorHandler)(), (0, _middlewares.controllerAdapter)(_CustomerController["default"], 'delete'));
module.exports = router;