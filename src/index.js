const express = require('express')
require('./db/mongoose')

const customerRouter = require('./router/customer')

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(customerRouter)


app.listen(port, () => {
  console.log(`Server is up on port ${port}!`)
})
