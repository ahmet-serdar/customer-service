import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

class Swagger {
  getRouter ({ swaggerDefinition }) {
    const router = Router();

    router.route('/').get((req, res) => {
      // options for the swagger docs
      const options = {
        // path to the API docs
        apis: ['dist/src/**/*.js'],
        // import swaggerDefinitions
        swaggerDefinition,
      };
      // initialize swagger-jsdoc
      const swaggerSpec = swaggerJSDoc(options);
      res.send(swaggerSpec);
    });

    return router;
  };

  getUI (swaggerUrl) {
    const options = {
      swaggerUrl: `${swaggerUrl}.json`,
    };

    return {
      serve: swaggerUi.serve,
      setup: swaggerUi.setup(undefined, options),
    };
  };
};

export default Swagger
