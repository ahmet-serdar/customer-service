"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.close = exports.open = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var open = function open(_ref) {
  var mongoUrl = _ref.mongoUrl;
  return new Promise(function (resolve, reject) {
    var options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      autoIndex: true,
      // Build indexes
      bufferMaxEntries: 0,
      keepAlive: 1,
      poolSize: 10 // Maintain up to 10 socket connections

    };

    _mongoose["default"].connect(mongoUrl, options);

    _mongoose["default"].connection.on("error", function (err) {
      reject(err);
    });

    _mongoose["default"].connection.on("connected", function (err) {
      resolve();
    });
  });
};

exports.open = open;

var close = function close() {
  _mongoose["default"].disconnect();
};

exports.close = close;