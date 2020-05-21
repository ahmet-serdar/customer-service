"use strict";

var okta = require('@okta/okta-sdk-nodejs');

var client = new okta.Client({
  orgUrl: "https://".concat(process.env.OKTA_DOMAIN_URL),
  token: '00dJg1tbhgH56HE2rwrpo6lSkqLxWz7I-j_mzv_RFd'
});
module.exports = client;