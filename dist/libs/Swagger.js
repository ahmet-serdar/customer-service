"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

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
        swaggerUrl: "".concat(swaggerUrl, ".json"),
        explorer: true
      };
      return {
        serve: _swaggerUiExpress["default"].serve,
        setup: _swaggerUiExpress["default"].setup(null, options)
      };
    }
  }]);

  return Swagger;
}();

;
var _default = Swagger;
exports["default"] = _default;