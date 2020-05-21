"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageNotFoundHandler = pageNotFoundHandler;

var _common = require("@ylz/common");

function pageNotFoundHandler(req, res, next) {
  return res.locals.isHit ? next() : next(new _common.errors.NotFoundError([]));
}