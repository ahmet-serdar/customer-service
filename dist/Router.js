"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var express = _interopRequireWildcard(require("express"));

var appInfo = _interopRequireWildcard(require("pjson"));

var _logger = require("@ylz/logger");

var _Swagger = _interopRequireDefault(require("./libs/Swagger"));

var _routes = _interopRequireDefault(require("./controller/customer/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Router = /*#__PURE__*/function () {
  function Router(config) {
    _classCallCheck(this, Router);

    this.router = void 0;
    this.config = config;
    /**
     * @swagger
     * securityDefinitions:
     *  APIKeyHeader:
     *    type: apiKey
     *    in: header
     *    name: Authorization
     */

    this.router = express.Router();
    this.initSwaggerRoute();
    this.initDefaultRoutes();
    this.initControllerRoutes();
  }

  _createClass(Router, [{
    key: "initSwaggerRoute",
    value: function initSwaggerRoute() {
      var _this$config = this.config,
          apiPrefix = _this$config.apiPrefix,
          swagger = _this$config.swagger;
      var swaggerDefinition = swagger.definition;
      var swaggerSetup = new _Swagger["default"](); // JSON route

      this.router.use("".concat(swagger.url, ".json"), swaggerSetup.getRouter({
        swaggerDefinition: swaggerDefinition
      })); // UI route

      var _swaggerSetup$getUI = swaggerSetup.getUI(apiPrefix + swagger.url),
          serve = _swaggerSetup$getUI.serve,
          setup = _swaggerSetup$getUI.setup;

      this.router.use(swagger.url, serve, setup);
    }
  }, {
    key: "initDefaultRoutes",
    value: function initDefaultRoutes() {
      //#region [swagger: /health-check - GET]

      /**
       * @swagger
       * /health-check:
       *   get:
       *     tags:
       *       - General
       *     description: Health Check
       *     produces:
       *       - application/json
       *     responses:
       *       200:
       *         description: I am OK
       */
      //#endregion
      this.router.get("/health-check", function (req, res) {
        res.send("I am OK");
      }); //#region [swagger: /version - GET]

      /**
       * @swagger
       * /version:
       *   get:
       *     tags:
       *       - General
       *     description: Get Version
       *     produces:
       *       - application/json
       *     responses:
       *       200:
       *         description: Version Response
       *         schema:
       *           type: object
       *           properties:
       *             version:
       *               type: string
       *               description: Version of the API.
       *             name:
       *               type: string
       *               description: Name of the API.
       *             description:
       *               type: string
       *               description: Description of the API.
       */
      //#endregion

      this.router.get("/version", function (req, res) {
        var version = appInfo.version,
            name = appInfo.name,
            description = appInfo.description;

        if (!(_typeof(version) && version)) {
          (0, _logger.error)("An error occurred while trying to get version: Version not defined");
          res.status(400).send(new Error("Version not defined"));
        }

        res.json({
          version: version,
          name: name,
          description: description
        });
      });
    }
  }, {
    key: "initControllerRoutes",
    value: function initControllerRoutes() {
      // mount email routes at /customers
      this.router.use("/customers", _routes["default"]);
    }
  }], [{
    key: "getInstance",
    value: function getInstance(config) {
      if (!Router.instance) {
        Router.instance = new Router(config);
      }

      return Router.instance;
    }
  }]);

  return Router;
}();

exports.Router = Router;
Router.instance = void 0;