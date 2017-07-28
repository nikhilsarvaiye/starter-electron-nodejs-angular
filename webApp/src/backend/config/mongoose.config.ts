import * as mongoose from "mongoose";
import { DataAccessConfig } from './../../config'

class Mongoose {

  static connect() {
    /* 
    * Mongoose by default sets the auto_reconnect option to true.
    * We recommend setting socket options at both the server and replica set level.
    * We recommend a 30 seconds(300000) connection timeout because it allows for 
    * plenty of time in most operating environments.
    * 3000000 - 300 seconds
    */
    var options = {
      server: { socketOptions: { keepAlive: 3000000000, connectTimeoutMS: 3000000 } },
      replset: { socketOptions: { keepAlive: 3000000000, connectTimeoutMS: 3000000 } }
    };
    // open mongoose connection
    mongoose.connect(DataAccessConfig.connectionString, options, (err: any) => {
      if (!err) {
        console.log("Connected to mongo db...");
      }
      else console.log(err);
    });

    (<any>mongoose).Promise = global.Promise;
    
  }
}


export { Mongoose }
