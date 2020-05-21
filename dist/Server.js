"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Server = void 0;

var compress = _interopRequireWildcard(require("compression"));

var helmet = _interopRequireWildcard(require("helmet"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _morganBody = _interopRequireDefault(require("morgan-body"));

var _common = require("@ylz/common");

var _CustomerController = _interopRequireDefault(require("./controller/customer/CustomerController"));

var _middlewares = require("./middlewares");

var _Router = require("./Router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var app = (0, _express["default"])();

var Server = /*#__PURE__*/function () {
  function Server(config, app) {
    var _this = this;

    _classCallCheck(this, Server);

    this.init = function () {
      _this.initMiddlewares(); // this.app.use(customerRouter)


      _this.initRoutes();

      _this.initErrorHandler(); // this.app.listen(this.config.port, () => {
      //   console.log(`Server is up on port ${this.config.port}!`)
      // })

    };

    this.initMiddlewares = function () {
      if (_this.config.nodeEnv === _common.constants.EnvVar.PROD) {
        _this.app.use(helmet());

        _this.app.use(compress());
      }

      _this.app.use((0, _cookieParser["default"])());

      _this.app.use((0, _cors["default"])({
        optionsSuccessStatus: 200,
        origin: JSON.parse(_this.config.corsOrigin) // credentials: true,

      }));

      _this.app.use(_bodyParser["default"].json());

      _this.app.use(_bodyParser["default"].urlencoded({
        extended: true
      }));

      if (_this.config.nodeEnv !== _common.constants.EnvVar.TEST) {
        (0, _morganBody["default"])(_this.app);
      }
    };

    this.initRoutes = function () {
      var apiPrefix = _this.config.apiPrefix;

      var router = _Router.Router.getInstance(_this.config).router; // mount all routes on /api path


      _this.app.use(apiPrefix, router); // catch 404 and forward to error handler


      _this.app.use(_middlewares.pageNotFoundHandler);
    };

    this.initErrorHandler = function (app) {
      var nodeEnv = _this.config.nodeEnv;

      _this.app.use((0, _middlewares.errorHandler)(nodeEnv));
    };

    this.config = config;
    this.app = app;
  }

  _createClass(Server, [{
    key: "application",
    get: function get() {
      return this.app;
    }
  }], [{
    key: "getInstance",
    value: function getInstance(config) {
      if (!Server.instance) {
        Server.instance = new Server(config, app);
      }

      return Server.instance;
    }
  }]);

  return Server;
}();

exports.Server = Server;