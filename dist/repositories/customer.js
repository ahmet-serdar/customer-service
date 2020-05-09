"use strict";

var mongoose = require('mongoose');

var validator = require('validator');

var mongoose_delete = require('mongoose-delete');

var customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  isIndividual: {
    type: Boolean,
    "default": true
  },
  address: [{
    firstLine: {
      type: String,
      trim: true
    },
    secondLine: {
      type: String,
      trim: true
    },
    thirdLine: {
      type: String,
      trim: true
    },
    town: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    postCode: {
      type: String,
      trim: true
    }
  }],
  phones: [{
    phone: {
      type: String,
      trim: true,
      required: true
    },
    phoneTypeId: {
      type: String,
      trim: true,
      required: true
    }
  }],
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  createdBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
customerSchema.plugin(mongoose_delete, {
  deletedAt: true
});
var Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;