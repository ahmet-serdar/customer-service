import * as compress from "compression";
import * as helmet from "helmet";
import express from 'express'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morganBody from "morgan-body";
import config from './config'
import { constants } from "@ylz/common";
import customerRouter from './controller/customer'
import { errorHandler } from './middleware'

const { nodeEnv, port, apiPrefix } = config

export const init = () => {
  const app = express()
  initMiddlewares(app) 
  app.use(customerRouter)
  initErrorHandler(app)

  app.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
  })
}

const initMiddlewares = (app) => {
  if (nodeEnv === constants.EnvVar.PROD) {
    app.use(helmet());
    app.use(compress());
  }
  app.use(cookieParser());
  app.use(
    cors({
      optionsSuccessStatus: 200,
      origin: JSON.parse(config.corsOrigin)
      // credentials: true,
    })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (nodeEnv !== constants.EnvVar.TEST) {
    morganBody(app);
  }
}

const initRoutes = () => {

}

const initErrorHandler = (app) => {
  app.use(errorHandler(nodeEnv));
}