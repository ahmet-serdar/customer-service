import { constants } from "@ylz/common";
import { utilities } from "@ylz/data-access";

const validations = Object.freeze({
  id: {
    custom: {
      options: (id) => utilities.isValidObjectId(id),
      errorMessage: "Wrong format!"
    }
  },
  firstName: {
    in: ['body'],
    exists: {
      errorMessage: 'First name is required'
    },
    isLength: {
      options: { min: 2 },
      errorMessage: "First name should be at least 2 chars long!"
    }
  },
  lastName: {
    exists: {
      errorMessage: 'Last name is required'
    },
    isLength: {
      options: { min: 2 },
      errorMessage: "Last name should be at least 2 chars long!"
    }
  },
  isIndividual: {
    isBoolean: true,
  },  
  // address: [{
  //   firstLine: {      
  //   },
  //   secondLine: {},
  //   thirdLine: {},
  //   town: {},
  //   city: {},
  //   postCode: {
  //     isPostalCode: true
  //   }
  // }],
  phones: {
    in: [constants.HttpRequestLocation.body],
    custom: {
      options: (phones) => Array.isArray(phones), // && phones.length > 0 && phones.every(x => isValidObjectId(x)),
      errorMessage: "Phones should be a list of strings!"
    }
  },
  email: {
    isEmail: true
  },
  createdBy: {}
});

/*
 * The location of the field, can be one or more of [body, cookies, headers, params, query].
 * If omitted, all request locations will be checked
 * */
export default Object.freeze({
  list: {
    limit: {
      in: [constants.HttpRequestLocation.query],
      isInt: true,
      optional: true,
      toInt: true,
      errorMessage: "Wrong format"
    },
    skip: {
      in: [constants.HttpRequestLocation.query],
      isInt: true,
      optional: true,
      toInt: true,
      errorMessage: "Wrong format"
    }
  },
  get: {
    id: validations.id
  },
  create: {
    firstName: validations.firstName,
    lastName: validations.lastName,
    isIndividual: validations.isIndividual,
    phones: validations.phones,
    email: validations.email,
    createdBy: validations.createdBy
  },
  update: {
    id: validations.id,
    firstName: validations.firstName,
    lastName: validations.lastName,
    isIndividual: validations.isIndividual,
    phones: validations.phones,
    email: validations.email,
    createdBy: validations.createdBy
  },
  delete: {
    id: validations.id
  }
});
