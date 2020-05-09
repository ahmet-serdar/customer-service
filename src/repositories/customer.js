const mongoose = require('mongoose')
const validator = require('validator')
const mongoose_delete = require('mongoose-delete')

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
})

customerSchema.plugin(mongoose_delete, { deletedAt: true })
 
const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer 