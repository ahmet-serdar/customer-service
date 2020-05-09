const express = require('express')
import Customer from '../repositories/customer'
const router = new express.Router()


router.post("/manager/customers", async (req, res) => {
  const customer = new Customer(req.body)

  try {
    await customer.save()
    res.status(201).send(customer)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/manager/customers', async (req, res) => {
  try{
    const users = await Customer.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/manager/customers/:id', async (req,res) => {
  const _id = req.params.id

  try {
    const customer = await Customer.findById(_id)

    if(!customer) {
      return res.status(404).send
    }

    res.send(customer)
  } catch (e) {
    res.status(500).send()
  }  
})

router.patch('/manager/customers/:id', async (req,res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['firstName', 'lastName', 'address', 'phone', 'email']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try{
    const customer = await Customer.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})

    if(!customer) {
      return res.status(404).send()
    }

    res.send(customer)
  } catch (e) {
    res.status(400).send
  }
})

router.delete('/manager/customers/:id', async (req, res) => {
  const _id = req.params.id
 
  try{
    const customer = await Customer.findById(_id)
    if(!customer || customer.deleted === true) {
      return res.status(404).send()
    }

    await Customer.delete({ customer })

    res.send(customer)
  } catch (e) {
    res.status(400).send
  }
})


module.exports = router;
