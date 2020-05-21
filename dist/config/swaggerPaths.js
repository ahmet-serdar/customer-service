// export default paths = {
//   path:
//    /customers:
//      post:
//       tags:
//         - Customers
//       description: Creates a new Customers
//       produces:
//         - application/json
//       parameters:
//         - name: name
//           description: Customers name
//           in: body
//           required: true
//           schema:
//             $ref: '#/src/repositories/customer'
//         - address: address
//           description: Customers address
//           in: body
//           required: true
//           schema:
//             $ref: '#/definitions/Customers'
//       responses:
//         200:
//           description: Successfully created
//           schema:
//             $ref: '#/definitions/Customers'
// }
"use strict";