/** @format */

const { constants } = require('@ylz/common')
const { utilities } = require('@ylz/data-access')

const validations = Object.freeze({
  id: {
    custom: {
      options: (id) => utilities.isValidObjectId(id),
      errorMessage: 'Wrong format!',
    },
  },
  firstName(locationType = constants.HttpRequestLocation.query, isRequired = true) {
    return {
      in: [locationType],
      optional: !isRequired,
      custom: {
        options: (value) => {
          if(value) {
            return value.length >= 1}
        },
        errorMessage: `First name cannot be empty`
      }
  }},
  lastName(locationType = constants.HttpRequestLocation.query, isRequired = true) {
    return {
      in: [locationType],
      optional: !isRequired,
      custom: {
        options: (value) => {
          if(value) {
            return value.length >= 1}
        },
        errorMessage: `First name cannot be empty`
      }
  }},
  isIndividual(locationType = constants.HttpRequestLocation.query, isRequired = true) {
    return {
      in: [locationType],
      optional: !isRequired,
      custom: {
        options: (value) => (typeof value === "boolean") || value === null,
        errorMessage: `Individual must be true or false`
      }
    };
  },
    phones(locationType = constants.HttpRequestLocation.query, isRequired = true) {
      return {
        in: [locationType],
        optional: !isRequired,
        custom: {
          options: (phones) => {
            console.log(phones.length, 'phones')
            if(phones.length > 0) {              
             const arr = phones.map(phone => {
                const phoneTypes = ['mobile', 'home','work'];
                console.log(phoneTypes.indexOf(phone.phoneTypeId) > -1 && phone.phone !== null, 'phone')
                
                if (phone){
                  return (phoneTypes.indexOf(phone.phoneTypeId) > -1 && typeof phone.phone === "string" && phone.phone.length > 0 );
                }
              })
              if (arr.indexOf(false) === -1) {
                return true
              }
            } else {
              return true
            }
          },
          errorMessage: `Please check your telefon number and phone type. Phone type can be one of ${['mobile ', 'home ','work']}`
        }
      };
    },
  email: {
    optional: { options: { nullable: true } },
    isEmail: true,
    errorMessage: 'Please include an @ in the email address.'    
  },
  createdBy(locationType = constants.HttpRequestLocation.query, isRequired = true) {
    return {
      in: [locationType],
      optional: !isRequired,
      custom: {
        options: (value) => {
          if(value) {
            return value.length >= 1}
        },
        errorMessage: `CreatedBy cannot be empty`
      }
  }}
});

/*
 * The location of the field, can be one or more of [body, cookies, headers, params, query].
 * If omitted, all request locations will be checked
 * */
const validator = Object.freeze({
  list: {
    limit: {
      in: [constants.HttpRequestLocation.query],
      isInt: true,
      optional: true,
      toInt: true,
      errorMessage: 'Wrong format',
    },
    skip: {
      in: [constants.HttpRequestLocation.query],
      isInt: true,
      optional: true,
      toInt: true,
      errorMessage: 'Wrong format',
    },
  },
  get: {
    id: validations.id,
  },
  create: {
    firstName: validations.firstName('body'),
    lastName: validations.lastName('body'),
    isIndividual: validations.isIndividual('body', false),
    phones: validations.phones('body', false),
    email: validations.email,
    createdBy: validations.createdBy('body')
  },
  update: {
    id: validations.id,
    firstName: validations.firstName('body',false ),
    lastName: validations.lastName('body', false),
    isIndividual: validations.isIndividual('body', false),
    phones: validations.phones('body', false),
    email: validations.email
  },
  delete: {
    id: validations.id,
  },
});

module.exports = validator