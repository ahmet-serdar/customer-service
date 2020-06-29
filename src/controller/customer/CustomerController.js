/** @format */

const Customer = require('../../repositories/customer');

const { debug } = require('@ylz/logger');
const { responses } = require('@ylz/common');

class CustomerController {
  static getInstance() {
    if (!CustomerController.instance) {
      CustomerController.instance = new CustomerController();
    }

    return CustomerController.instance;
  }

  async create({ body, locals }) {
    debug('CustemerController - create:', JSON.stringify(body));
    const managerID = locals.managerID
    const bodyKeys = Object.keys(body);
    const allowedKeys = [
      'firstName',
      'lastName',
      'isIndividual',
      'address',
      'phones',
      'email'
    ];
    const isValidOperation = bodyKeys.every((key) => allowedKeys.includes(key));

    if (!isValidOperation) {
      return new responses.BadRequestResponse(undefined, 'Invalid keys!.');
    }

    const customer = new Customer(body);
    customer.createdBy = managerID

    await customer.save();

    return new responses.CreatedResponse(customer._id);
  }

  async list({ query }) {
    debug('CustomerController - list:', JSON.stringify(query, null, 2));

    const { limit = 10, skip = 0 } = query;
    const data = await Customer.find({},null,{ limit, skip: skip * limit });
    const length = await Customer.find().count()

    return new responses.OkResponse({data, length});
  }

  async get({ params }) {
    debug('CustomerController - get:', JSON.stringify(params));

    const _id = params.id;
    const customer = await Customer.findById(_id);

    return customer
      ? new responses.OkResponse(customer)
      : new responses.NotFoundResponse(
          'Customer not exist!'
        );
  }

  async update(req, res) {
    const { params, body } = req;
    debug('CustomerController - update:', JSON.stringify({ params, body }));

    const _id = params.id;
    const updates = Object.keys(body);
    const allowedUpdates = [
      'firstName',
      'lastName',
      'isIndividual',
      'address',
      'phones',
      'email',
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      const notAllowedUpdates = updates.filter(
        (update) => !allowedUpdates.includes(update)
      );
      return new responses.BadRequestResponse(undefined, `${notAllowedUpdates} is/are not allowed to update!`);
    }

    const customer = await Customer.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });


    return customer
      ? new responses.OkResponse(customer)
      : new responses.NotFoundResponse('Customer not exist!');
  }

  async delete({ params, locals }) {
    debug('CustomerController - delete:', JSON.stringify(params));
    const managerID = locals.managerID
    const _id = params.id;

    let customer = await Customer.findById(_id);
    if(customer.deletedAt !== null) {
      return new responses.BadRequestResponse('Customer was already deleted!')
    }

    customer = await Customer.findByIdAndUpdate(
      _id,
      { deletedAt: new Date(), deletedBy: managerID },
      { new: true, runValidators: true }
    );

    return customer
      ? new responses.OkResponse(customer)
      : new responses.NotFoundResponse('Customer not exist!');
  }
}

module.exports = CustomerController.getInstance();
