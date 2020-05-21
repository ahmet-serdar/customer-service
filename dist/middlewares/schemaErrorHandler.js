"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schemaErrorHandler = schemaErrorHandler;

var _expressValidator = require("express-validator");

var _common = require("@ylz/common");

function schemaErrorHandler() {
  return function (req, res, next) {
    var errors = (0, _expressValidator.validationResult)(req);

    if (!errors.isEmpty()) {
      var response = new _common.responses.UnprocessableResponse({
        data: errors.array()
      });
      return res.status(response.metadata.code).json(response); // return res.json({}).end();
    }

    next();
  };
}