"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = auth;

var _common = require("@ylz/common");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/** @format */
var OktaJwtVerifier = require('@okta/jwt-verifier');

var verifier = new OktaJwtVerifier({
  issuer: process.env.OKTA_DOMAIN_URL,
  clientId: process.env.OKTA_CLIENT_ID // assertClaims: {
  //   'groups.includes': ['Everyone', 'Manager', 'Admin']
  // }

});

function auth() {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var response, accessToken;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (req.headers.authorization) {
                _context.next = 4;
                break;
              }

              response = new _common.responses.UnauthorizedResponse({}, 'Authentication failed! Try again.');
              return _context.abrupt("return", res.status(response.metadata.code).json(response));

            case 4:
              accessToken = req.headers.authorization.trim().split(' ')[0];
              _context.next = 7;
              return verifier.verifyAccessToken(accessToken, 'api://default');

            case 7:
              next();
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              next(_context.t0.message);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 10]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
}