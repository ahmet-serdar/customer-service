const Customer = require('../../repositories/customer')

const { debug } = require('@ylz/logger')
const { responses } = require('@ylz/common')

class CustomerController {
  static getInstance() {
    if (!CustomerController.instance) {
      CustomerController.instance = new CustomerController();
    }

    return CustomerController.instance;
  }

  async create({ body }){
    debug('CustemerController - create:', JSON.stringify(body));

    const customer = new Customer(body)
    await customer.save()

    return new responses.CreatedResponse({ data: customer });
  }

  async list({ query }) {
    debug('CustomerController - list:', JSON.stringify(query, null, 2));

    const { limit, skip } = query;
    const data = await Customer.find({ limit, skip });

    return new responses.OkResponse({ data });
  }

  async get({ params }) {
    debug('CustomerController - get:', JSON.stringify(params));

    const _id = params.id;
    const customer = await Customer.findById(_id);

    return customer
      ? new responses.OkResponse({ data: customer })
      : new responses.BadRequestResponse({
          message: 'Could not find the customer.',
        });
  }

  async update(req, res){
    const {params, body} = req
    debug("CustomerController - update:", JSON.stringify({ params, body }));

    const _id = params.id
    const updates = Object.keys(body)
    // const allowedUpdates = ['firstName', 'lastName', 'address', 'phones', 'email', 'isIndividual']
    // const isValidOperation = updates.every(update =>
    //   allowedUpdates.includes(update)
    // );
    // if (!isValidOperation) {
    //   return new responses.BadRequestResponse({
    //     message: 'Invalid updates.',
    //   });;
    // }
    const customer = await Customer.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})

    return customer
      ? new responses.OkResponse({ data: customer })
      : new responses.BadRequestResponse({
          message: 'Could not find the customer.',
        });
  }

  async delete({ params }) {
    debug("CustomerController - delete:", JSON.stringify(params));

    const _id = params.id;

    const customer = await Customer.findById(_id)

    if(!customer || customer.deleted === true) {
      return res.status(404).send()
    }

    await Customer.deleteById(_id)
    
    return new responses.OkResponse({ data: customer })    
  }
}

module.exports = CustomerController.getInstance()
