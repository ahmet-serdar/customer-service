import "regenerator-runtime/runtime.js"
import { error, info } from "@ylz/logger";
import config from './config'
import { Server } from './Server'
import { Database } from './services/Database'

const { mongoUrl } = config;

Database.open({ mongoUrl })
.then(() => {
  const server = Server.getInstance(config);
  server.init()
  const runningServer = server.application.listen(config.port);

  runningServer.on("listening", async () => {
    const ann = `|| App is running at port "${config.port}" in "${config.nodeEnv}" mode ||`
    info(ann.replace(/[^]/g, "-"));
    info(ann);
    info(ann.replace(/[^]/g, "-"));
    info("Press CTRL-C to stop\n");
  });
  
  runningServer.on("error", (err) => {
    console.log(":::::: GOT ERROR IN STARTING SERVER ::::::");
    error(err);
  });

  runningServer.on("close", () => {
    console.log(`:::::: CLOSING SERVER RUNNING ON "${config.port}" IN "${config.nodeEnv}" MODE ::::::`);
  });
})
.catch(err => {
  console.log(":::::: GOT ERROR IN CREATING CONNECTION WITH DB ::::::");
  error(err);
});