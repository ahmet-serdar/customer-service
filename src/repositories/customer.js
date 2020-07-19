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
    _id: false,
    id: {
    type: String,
    required: true
    },
    name: {
      type: String,
      // required: true
    }
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

customerSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 
const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer 