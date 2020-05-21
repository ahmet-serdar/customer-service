"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var OktaJwtVerifier = require('@okta/jwt-verifier');

var verifier = new OktaJwtVerifier({
  issuer: "https://".concat(process.env.OKTA_DOMAIN_URL, "/oauth2/default"),
  clientId: process.env.CLIENT_ID,
  assertClaims: {
    'groups.includes': ['Everyone', 'Manager', 'Admin']
  }
});

var auth = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            next(); // try {
            //     const token = req.header('Authorization').replace('Bearer ', '')
            //     const decoded = verifier.verifyAccessToken(token, 'api://default')
            //     console.log(decoded.claims)
            //     // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
            //     // if(!user) {
            //     //     throw new Error()
            //     // }
            //     // req.token = token
            //     // req.user = user
            //     next()
            // } catch (e) {
            //     res.status(401).send({error: 'Please authenticate.'})
            // }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function auth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = auth;