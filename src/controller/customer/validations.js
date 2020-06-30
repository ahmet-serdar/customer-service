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
        errorMessage: `First name is required!`
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
        errorMessage: `Last name is required!`
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
            if(phones.length > 0) {              
             const arr = phones.map(phone => {
                const phoneTypes = ['mobile', 'home','work'];                
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
          errorMessage: `Please check your telefon number and phone type.`
        }
      };
    },
    email(locationType = constants.HttpRequestLocation.query, isRequired = true) {
      return {
        in: [locationType],
        optional: !isRequired,
        custom: {
          options: (value) => {
            if(value !== null && value.length !== 0 ) {
              return new RegExp("[a-zA-Z0-9_]+.[a-zA-Z0-9_]+@[a-zA-Z0-9]+.[a-z]{1,8}").test(value)
          }
          else {
            return true
          }
        },
          errorMessage: `Please check your email!`
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
    email: validations.email('body', false)
  },
  update: {
    id: validations.id,
    firstName: validations.firstName('body',false ),
    lastName: validations.lastName('body', false),
    isIndividual: validations.isIndividual('body', false),
    phones: validations.phones('body', false),
    email: validations.email('body', false),
  },
  delete: {
    id: validations.id,
  },
});

module.exports = validator