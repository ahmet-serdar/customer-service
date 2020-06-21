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

  async create({ body }) {
    // debug('CustemerController - create:', JSON.stringify(body));
    const bodyKeys = Object.keys(body);
    const allowedKeys = [
      'firstName',
      'lastName',
      'isIndividual',
      'address',
      'phones',
      'email',
      'createdBy',
    ];
    const isValidOperation = bodyKeys.every((key) => allowedKeys.includes(key));

    if (!isValidOperation) {
      return new responses.BadRequestResponse(undefined, 'Invalid keys!.');
    }

    const customer = new Customer(body);

    await customer.save();

    return new responses.CreatedResponse(customer._id);
  }

  async list({ query }) {
    debug('CustomerController - list:', JSON.stringify(query, null, 2));

    const { limit, skip } = query;
    const data = await Customer.find({ limit, skip });

    return new responses.OkResponse(data);
  }

  async get({ params }) {
    debug('CustomerController - get:', JSON.stringify(params));

    const _id = params.id;
    const customer = await Customer.findById(_id);

    if (!customer) {
      return new responses.NotFoundResponse(undefined, 'Customer not exist!');
    }

    return customer
      ? new responses.OkResponse(customer)
      : new responses.BadRequestResponse(
          undefined,
          'Could not find the customer.'
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
      return new responses.BadRequestResponse(undefined, notAllowedUpdates);
    }

    const customer = await Customer.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });

    if (!customer) {
      return new responses.NotFoundResponse(undefined, 'Customer not exist!');
    }

    return customer
      ? new responses.OkResponse(customer)
      : new responses.BadRequestResponse(
          undefined,
          'Could not find the customer.'
        );
  }

  async delete({ params }) {
    debug('CustomerController - delete:', JSON.stringify(params));

    const _id = params.id;

    let customer = await Customer.findById(_id);

    // if(!customer || customer.isDeleted === true) {
    //   return new responses.NotFoundResponse('Customer was deleted or not exist!')
    // }
    customer = await Customer.findByIdAndUpdate(
      _id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true, runValidators: true }
    );

    return customer
      ? new responses.OkResponse(customer)
      : new responses.BadRequestResponse(
          undefined,
          'Could not find the customer.'
        );
  }
}

module.exports = CustomerController.getInstance();
