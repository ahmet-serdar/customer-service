"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = errorHandler;

var _logger = require("@ylz/logger");

var _common = require("@ylz/common");

function errorHandler(nodeEnv) {
  return function errorHandler(err, req, res, next) {
    if (nodeEnv !== _common.constants.EnvVar.TEST) {
      (0, _logger.error)(err);
    }

    var response;

    switch (err.type) {
      case _common.errors.NotFoundError.name:
        response = new _common.responses.NotFoundResponse();
        break;

      case _common.errors.DbValidationError.name:
        response = new _common.responses.UnprocessableResponse({
          data: err.data.map(function (e) {
            return {
              location: "",
              param: e.path,
              value: e.value,
              msg: e.message
            };
          }),
          message: err.message
        });
        break;

      case _common.errors.DuplicateKeyError.name:
        response = new _common.responses.UnprocessableResponse({
          message: err.message
        });
        break;

      case _common.errors.BadRequestError.name:
        response = new _common.responses.BadRequestResponse({
          message: err.message
        });
        break;

      case _common.errors.InternalServerError.name:
      default:
        if (err.name === "AuthenticationError") {
          response = new _common.responses.UnauthorizedResponse({});
        } else {
          response = new _common.responses.InternalServerErrorResponse({});
        }

        break;
    }

    res.status(response.metadata.code).json(response);
  };
}