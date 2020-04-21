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
  address:[],
  phone: [],
  email: {
    type: String,
    trim: true,
    lowercase: true
  }
}, {
  timestamps: true
})

customerSchema.plugin(mongoose_delete, { deletedAt: true })

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer 