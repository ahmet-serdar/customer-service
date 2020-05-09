"use strict";

var _customer = _interopRequireDefault(require("../repositories/customer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var router = new express.Router();
router.post("/manager/customers", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var customer;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            customer = new _customer["default"](req.body);
            _context.prev = 1;
            _context.next = 4;
            return customer.save();

          case 4:
            res.status(201).send(customer);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            res.status(400).send(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/manager/customers', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _customer["default"].find({});

          case 3:
            users = _context2.sent;
            res.send(users);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(500).send(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/manager/customers/:id', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _id, customer;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _customer["default"].findById(_id);

          case 4:
            customer = _context3.sent;

            if (customer) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(404).send);

          case 7:
            res.send(customer);
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);
            res.status(500).send();

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 10]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.patch('/manager/customers/:id', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _id, updates, allowedUpdates, isValidOperation, customer;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _id = req.params.id;
            updates = Object.keys(req.body);
            allowedUpdates = ['firstName', 'lastName', 'address', 'phone', 'email'];
            isValidOperation = updates.every(function (update) {
              return allowedUpdates.includes(update);
            });

            if (isValidOperation) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              error: "Invalid updates!"
            }));

          case 6:
            _context4.prev = 6;
            _context4.next = 9;
            return _customer["default"].findByIdAndUpdate(_id, req.body, {
              "new": true,
              runValidators: true
            });

          case 9:
            customer = _context4.sent;

            if (customer) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("return", res.status(404).send());

          case 12:
            res.send(customer);
            _context4.next = 18;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](6);
            res.status(400).send;

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 15]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router["delete"]('/manager/customers/:id', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _id, customer;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _customer["default"].findById(_id);

          case 4:
            customer = _context5.sent;

            if (!(!customer || customer.deleted === true)) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.status(404).send());

          case 7:
            _context5.next = 9;
            return _customer["default"]["delete"]({
              customer: customer
            });

          case 9:
            res.send(customer);
            _context5.next = 15;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            res.status(400).send;

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = router;