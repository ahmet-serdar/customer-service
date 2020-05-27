import * as compress from "compression";
import * as helmet from "helmet";
import express from 'express'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morganBody from "morgan-body";
import { constants } from "@ylz/common";
import customerRouter from './controller/customer/CustomerController'
import { auth, errorHandler, pageNotFoundHandler } from './middlewares'
import { Router } from './Router'


const app = express()
export class Server {
  constructor(config, app) {
    this.config = config;
    this.app = app
  }
  get application() {
    return this.app;
  }

  static getInstance(config) {
    if (!Server.instance) {

      Server.instance = new Server(config, app);
    }

    return Server.instance;
  }
   

   init = () => {
    
    this.initMiddlewares() 
    this.initRoutes()
    this.initErrorHandler()
  }
  
    initMiddlewares = () => {
    if (this.config.nodeEnv === constants.EnvVar.PROD) {
      this.app.use(helmet());
      this.app.use(compress());
    }
    this.app.use(cookieParser());
    this.app.use(
      cors({
        optionsSuccessStatus: 200,
        origin: JSON.parse(this.config.corsOrigin)
        // credentials: true,
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  
    if (this.config.nodeEnv !== constants.EnvVar.TEST) {
      morganBody(this.app);
    }

    // this.app.use(auth())
  }
  
  initRoutes = () => {
    const { apiPrefix } = this.config;
    const router = Router.getInstance(this.config).router;

    // mount all routes on /api path
    this.app.use(apiPrefix, router);

    // catch 404 and forward to error handler
    this.app.use(pageNotFoundHandler);
  }
  
  initErrorHandler = () => {
    const { nodeEnv } = this.config
    this.app.use(errorHandler(nodeEnv));
  }
}