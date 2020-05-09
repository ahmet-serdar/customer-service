"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var compress = _interopRequireWildcard(require("compression"));

var helmet = _interopRequireWildcard(require("helmet"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _morganBody = _interopRequireDefault(require("morgan-body"));

var _config = _interopRequireDefault(require("./config"));

var _common = require("@ylz/common");

var _customer = _interopRequireDefault(require("./controller/customer"));

var _middleware = require("./middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var nodeEnv = _config["default"].nodeEnv,
    port = _config["default"].port,
    apiPrefix = _config["default"].apiPrefix;

var init = function init() {
  var app = (0, _express["default"])();
  initMiddlewares(app);
  app.use(_customer["default"]);
  initErrorHandler(app);
  app.listen(port, function () {
    console.log("Server is up on port ".concat(port, "!"));
  });
};

exports.init = init;

var initMiddlewares = function initMiddlewares(app) {
  if (nodeEnv === _common.constants.EnvVar.PROD) {
    app.use(helmet());
    app.use(compress());
  }

  app.use((0, _cookieParser["default"])());
  app.use((0, _cors["default"])({
    optionsSuccessStatus: 200,
    origin: JSON.parse(_config["default"].corsOrigin) // credentials: true,

  }));
  app.use(_bodyParser["default"].json());
  app.use(_bodyParser["default"].urlencoded({
    extended: true
  }));

  if (nodeEnv !== _common.constants.EnvVar.TEST) {
    (0, _morganBody["default"])(app);
  }
};

var initRoutes = function initRoutes() {};

var initErrorHandler = function initErrorHandler(app) {
  app.use((0, _middleware.errorHandler)(nodeEnv));
};