"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.close = exports.Database = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Database = function Database() {
  _classCallCheck(this, Database);
};

exports.Database = Database;

Database.open = function (_ref) {
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

var close = function close() {
  _mongoose["default"].disconnect();
};

exports.close = close;