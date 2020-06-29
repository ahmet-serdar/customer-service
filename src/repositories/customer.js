const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema ({
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
    default: true,
  },
  address:[{
    _id : false,
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
    },
  }],
  phones: [{
    _id : false,
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
  },
  deletedAt: {
    type: Date || null,
    default: null
  },
  deletedBy: {
    type: String,
    default: null
  }
}, {
  timestamps: true
})
const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer 