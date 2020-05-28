import dotenv from 'dotenv'

if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config();
}
   
const config = {
  apiPrefix: process.env.API_PREFIX,
  corsOrigin: process.env.CORS_ORIGIN,
  mongoUrl: process.env.MONGODB_URL,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  serviceName: process.env.SERVICE_NAME,
  swagger: {
    definition: {
      basePath: "/manager",
      info: {
        description: "Customer API with Swagger",
        title: "Customer API documentation",
        version: ""
      }, 
      servers: [`http://localhost:${process.env.PORT}`],
      
    },  
    apis: ['dist/src/**/*.js'],
    url: "/_docs"
  }
};

console.log(":::::: INITIAL CONFIGURATIONS ::::::");
console.log(JSON.stringify(config, null, 2));

export default config;