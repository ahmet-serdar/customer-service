"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = require("@ylz/common");

var _dataAccess = require("@ylz/data-access");

var _validations = require("@ylz/common/dist/src/libs/validations");

/** @format */
var validations = Object.freeze({
  id: {
    custom: {
      options: function options(id) {
        return _dataAccess.utilities.isValidObjectId(id);
      },
      errorMessage: 'Wrong format!'
    }
  },
  firstName: {
    "in": ['body'],
    exists: {
      errorMessage: 'First name is required'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'First name should be at least 2 chars long!'
    }
  },
  lastName: {
    exists: {
      errorMessage: 'Last name is required'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'Last name should be at least 2 chars long!'
    }
  },
  isIndividual: {
    custom: {
      options: function options(value) {
        if (value !== undefined || value !== null) {
          return (0, _validations.isBoolean)(value);
        }
      },
      errorMessage: 'Individual must be true or false!'
    }
  },
  // address: [{
  //   firstLine: {
  //   },
  //   secondLine: {},
  //   thirdLine: {},
  //   town: {},
  //   city: {},
  //   postCode: {
  //     isPostalCode: true
  //   }
  // }],
  phones: {
    "in": [_common.constants.HttpRequestLocation.body],
    custom: {
      options: function options(phones) {
        return Array.isArray(phones);
      },
      // && phones.length > 0 && phones.every(x => isValidObjectId(x)),
      errorMessage: 'Phones should be a list of strings!'
    }
  },
  email: {
    isEmail: true
  },
  createdBy: {}
});
/*
 * The location of the field, can be one or more of [body, cookies, headers, params, query].
 * If omitted, all request locations will be checked
 * */

var _default = Object.freeze({
  list: {
    limit: {
      "in": [_common.constants.HttpRequestLocation.query],
      isInt: true,
      optional: true,
      toInt: true,
      errorMessage: 'Wrong format'
    },
    skip: {
      "in": [_common.constants.HttpRequestLocation.query],
      isInt: true,
      optional: true,
      toInt: true,
      errorMessage: 'Wrong format'
    }
  },
  get: {
    id: validations.id
  },
  create: {
    firstName: validations.firstName,
    lastName: validations.lastName,
    isIndividual: validations.isIndividual,
    phones: validations.phones,
    email: validations.email,
    createdBy: validations.createdBy
  },
  update: {
    id: validations.id,
    firstName: validations.firstName,
    lastName: validations.lastName,
    isIndividual: validations.isIndividual,
    phones: validations.phones,
    email: validations.email,
    createdBy: validations.createdBy
  },
  "delete": {
    id: validations.id
  }
});

exports["default"] = _default;