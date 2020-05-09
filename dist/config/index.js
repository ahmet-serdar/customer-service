"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (process.env.NODE_ENV === "test") {
  _dotenv["default"].config({
    path: ".env.test"
  });
} else {
  _dotenv["default"].config();
}

var config = {
  apiPrefix: process.env.API_PREFIX,
  corsOrigin: process.env.CORS_ORIGIN,
  mongoUrl: process.env.MONGODB_URL,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  serviceName: process.env.SERVICE_NAME,
  swagger: {
    definition: {
      basePath: "/api",
      info: {
        description: "Customer API with Swagger",
        title: "Customer API documentation",
        version: ""
      },
      servers: ["http://localhost:".concat(process.env.PORT)]
    },
    apis: ["../*.js", "../**.js/routes/*.js"],
    url: "/_docs"
  }
};
console.log(":::::: INITIAL CONFIGURATIONS ::::::");
console.log(JSON.stringify(config, null, 2));
var _default = config;
exports["default"] = _default;