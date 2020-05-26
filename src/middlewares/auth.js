/** @format */

const OktaJwtVerifier = require('@okta/jwt-verifier');
import { responses } from "@ylz/common";

const verifier = new OktaJwtVerifier({
  issuer: process.env.OKTA_DOMAIN_URL,
  clientId: process.env.OKTA_CLIENT_ID,
  // assertClaims: {
  //   'groups.includes': ['Everyone', 'Manager', 'Admin']
  // }
});

export function auth() {
  return async (req, res, next) => {
    try {
      if (!req.headers.authorization){
        const response = new responses.UnauthorizedResponse({},'Authentication failed! Try again.');
        return res.status(response.metadata.code).json(response);
      }
      const accessToken = req.headers.authorization.trim().split(' ')[0];      
      await verifier.verifyAccessToken(accessToken, 'api://default');
      next();
    } catch (error) {
      next(error.message);
    }
  };
}
