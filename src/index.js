import "regenerator-runtime/runtime.js"
import config from './config'
import * as Server from './Server'
import * as Database from './services/Database'

const { mongoUrl } = config;

Database.open({ mongoUrl })
.then(() => {
  Server.init()
})
.catch(err => {
  console.log(":::::: GOT ERROR IN CREATING CONNECTION WITH DB ::::::");
  error(err);
});