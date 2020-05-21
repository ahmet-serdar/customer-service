"use strict";

require("regenerator-runtime/runtime.js");

var _logger = require("@ylz/logger");

var _config = _interopRequireDefault(require("./config"));

var _Server = require("./Server");

var _Database = require("./services/Database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoUrl = _config["default"].mongoUrl;

_Database.Database.open({
  mongoUrl: mongoUrl
}).then(function () {
  var server = _Server.Server.getInstance(_config["default"]);

  server.init();
  var runningServer = server.application.listen(_config["default"].port);
  runningServer.on("listening", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var ann;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ann = "|| App is running at port \"".concat(_config["default"].port, "\" in \"").concat(_config["default"].nodeEnv, "\" mode ||");
            (0, _logger.info)(ann.replace(/[^]/g, "-"));
            (0, _logger.info)(ann);
            (0, _logger.info)(ann.replace(/[^]/g, "-"));
            (0, _logger.info)("Press CTRL-C to stop\n");

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  runningServer.on("error", function (err) {
    console.log(":::::: GOT ERROR IN STARTING SERVER ::::::");
    (0, _logger.error)(err);
  });
  runningServer.on("close", function () {
    console.log(":::::: CLOSING SERVER RUNNING ON \"".concat(_config["default"].port, "\" IN \"").concat(_config["default"].nodeEnv, "\" MODE ::::::"));
  });
})["catch"](function (err) {
  console.log(":::::: GOT ERROR IN CREATING CONNECTION WITH DB ::::::");
  (0, _logger.error)(err);
});