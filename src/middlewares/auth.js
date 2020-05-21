const OktaJwtVerifier = require('@okta/jwt-verifier');

const verifier = new OktaJwtVerifier({
  issuer: `https://${process.env.OKTA_DOMAIN_URL}/oauth2/default` ,
  clientId: process.env.CLIENT_ID,
  assertClaims: {
    'groups.includes': ['Everyone', 'Manager', 'Admin']
  }
});

const auth = async (req, res, next) => {
  next()
  // try {
  //     const token = req.header('Authorization').replace('Bearer ', '')
  //     const decoded = verifier.verifyAccessToken(token, 'api://default')
  //     console.log(decoded.claims)
  //     // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

  //     // if(!user) {
  //     //     throw new Error()
  //     // }

  //     // req.token = token
  //     // req.user = user
  //     next()
  // } catch (e) {
  //     res.status(401).send({error: 'Please authenticate.'})
  // }
}

module.exports = auth