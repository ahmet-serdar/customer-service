const mongoose = require('mongoose')

const connectionURL = process.env.MONGODB_URL;

mongoose.connect('mongodb://127.0.0.1:27017/customer-service-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

