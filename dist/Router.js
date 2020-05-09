"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _logger = _interopRequireDefault(require("@ylz/logger"));

var _Swagger = _interopRequireDefault(require("./lib/Swagger"));

var _customer = _interopRequireDefault(require("./controller/customer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Router = /*#__PURE__*/function () {
  function Router(config) {
    _classCallCheck(this, Router);

    this.config = config;
    /**
         * @swagger
         * securityDefinitions:
         *  APIKeyHeader:
         *    type: apiKey
         *    in: header
         *    name: Authorization
         */

    this.router = _express["default"].Router();
    this.initSwaggerRoute();
    this.initDefaultRoutes();
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
        var _appInfo = appInfo,
            version = _appInfo.version,
            name = _appInfo.name,
            description = _appInfo.description;

        if (!(_typeof(version) && version)) {
          logger_1.error("An error occurred while trying to get version: Version not defined");
          res.status(400).send(new Error("Version not defined"));
        }

        res.json({
          version: version,
          name: name,
          description: description
        });
      });
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

var _default = Router;
exports["default"] = _default;