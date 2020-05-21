"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controllerAdapter = controllerAdapter;

var _logger = require("@ylz/logger");

var _common = require("@ylz/common");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function controllerAdapter() {
  var controller = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var functionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var authorization, params, query, body, locals, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              authorization = req.headers.authorization, params = req.params, query = req.query, body = req.body;
              locals = res.locals;

              if (!locals.isHit) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", next());

            case 5:
              _context.next = 7;
              return controller[functionName]({
                headers: {
                  authorization: authorization
                },
                params: params,
                query: query,
                body: body,
                locals: locals
              });

            case 7:
              response = _context.sent;
              res.locals.isHit = true;
              res.status(response.metadata.code).json(response);
              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              (0, _logger.error)(_context.t0);
              next(_context.t0);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 12]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
}