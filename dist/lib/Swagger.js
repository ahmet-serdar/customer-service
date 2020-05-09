"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var swaggerUi = _interopRequireWildcard(require("swagger-ui-express"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Swagger = /*#__PURE__*/function () {
  function Swagger() {
    _classCallCheck(this, Swagger);
  }

  _createClass(Swagger, [{
    key: "getRouter",
    value: function getRouter(_ref) {
      var swaggerDefinition = _ref.swaggerDefinition;
      var router = (0, _express.Router)();
      router.route('/').get(function (req, res) {
        // options for the swagger docs
        var options = {
          // path to the API docs
          apis: ['dist/src/**/*.js'],
          // import swaggerDefinitions
          swaggerDefinition: swaggerDefinition
        }; // initialize swagger-jsdoc

        var swaggerSpec = (0, _swaggerJsdoc["default"])(options);
        res.send(swaggerSpec);
      });
      return router;
    }
  }, {
    key: "getUI",
    value: function getUI(swaggerUrl) {
      var options = {
        swaggerUrl: "".concat(swaggerUrl, ".json")
      };
      return {
        serve: swaggerUi.serve,
        setup: swaggerUi.setup(undefined, options)
      };
    }
  }]);

  return Swagger;
}();

;
var _default = Swagger;
exports["default"] = _default;