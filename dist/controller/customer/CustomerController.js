"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _customer = _interopRequireDefault(require("../../repositories/customer"));

var _logger = require("@ylz/logger");

var _common = require("@ylz/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomerController = /*#__PURE__*/function () {
  function CustomerController() {
    _classCallCheck(this, CustomerController);
  }

  _createClass(CustomerController, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var body, customer;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                body = _ref.body;
                (0, _logger.debug)('CustemerController - create:', JSON.stringify(body));
                customer = new _customer["default"](body);
                _context.next = 5;
                return customer.save();

              case 5:
                return _context.abrupt("return", new _common.responses.CreatedResponse({
                  data: customer
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "list",
    value: function () {
      var _list = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
        var query, limit, skip, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = _ref2.query;
                (0, _logger.debug)('CustomerController - list:', JSON.stringify(query, null, 2));
                limit = query.limit, skip = query.skip;
                _context2.next = 5;
                return _customer["default"].find({
                  limit: limit,
                  skip: skip
                });

              case 5:
                data = _context2.sent;
                return _context2.abrupt("return", new _common.responses.OkResponse({
                  data: data
                }));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function list(_x2) {
        return _list.apply(this, arguments);
      }

      return list;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref3) {
        var params, _id, customer;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _ref3.params;
                (0, _logger.debug)('CustomerController - get:', JSON.stringify(params));
                _id = params.id;
                _context3.next = 5;
                return _customer["default"].findById(_id);

              case 5:
                customer = _context3.sent;
                return _context3.abrupt("return", customer ? new _common.responses.OkResponse({
                  data: customer
                }) : new _common.responses.BadRequestResponse({
                  message: 'Could not find the customer.'
                }));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function get(_x3) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var params, body, _id, updates, customer;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = req.params, body = req.body;
                (0, _logger.debug)("CustomerController - update:", JSON.stringify({
                  params: params,
                  body: body
                }));
                _id = params.id;
                updates = Object.keys(body); // const allowedUpdates = ['firstName', 'lastName', 'address', 'phones', 'email', 'isIndividual']
                // const isValidOperation = updates.every(update =>
                //   allowedUpdates.includes(update)
                // );
                // if (!isValidOperation) {
                //   return new responses.BadRequestResponse({
                //     message: 'Invalid updates.',
                //   });;
                // }

                _context4.next = 6;
                return _customer["default"].findByIdAndUpdate(_id, req.body, {
                  "new": true,
                  runValidators: true
                });

              case 6:
                customer = _context4.sent;
                return _context4.abrupt("return", customer ? new _common.responses.OkResponse({
                  data: customer
                }) : new _common.responses.BadRequestResponse({
                  message: 'Could not find the customer.'
                }));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function update(_x4, _x5) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref4) {
        var params, _id, customer;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _ref4.params;
                (0, _logger.debug)("CustomerController - delete:", JSON.stringify(params));
                _id = params.id;
                _context5.next = 5;
                return _customer["default"].findById(_id);

              case 5:
                customer = _context5.sent;

                if (!(!customer || customer.deleted === true)) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return", res.status(404).send());

              case 8:
                _context5.next = 10;
                return _customer["default"].deleteById(_id);

              case 10:
                return _context5.abrupt("return", new _common.responses.OkResponse({
                  data: customer
                }));

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function _delete(_x6) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!CustomerController.instance) {
        CustomerController.instance = new CustomerController();
      }

      return CustomerController.instance;
    }
  }]);

  return CustomerController;
}();

var _default = CustomerController.getInstance();

exports["default"] = _default;