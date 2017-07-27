import * as express from 'express';
import * as http from 'http';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import * as socket from 'socket.io';
import * as mongoose from 'mongoose';
import * as redis from 'socket.io-redis';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';

const cookieParser = require('cookie-parser');
const session = require('express-session');
import * as passportSocketIo from 'passport.socketio';

import { ServerEnvironment, DataAccessConfig, AuthConfig } from './../../config';
import { ServerRoutes } from './../server.routes';
import { RoomSocket, ChatSocket } from './../socket';
import { passport } from './passport.config';

declare var process, __dirname;

// Set Redis adapter
const RedisStore = require('connect-redis')(session);
const MongoStore = require('connect-mongo')(session);
const REDIS_URL = process.env.REDIS_URL || 'redis://nconnect.nitor:6379';
const sessionStore = new RedisStore({
  url: process.env.REDIS_URL || DataAccessConfig.redisConnectionString
});
// const sessionStore = new MongoStore({
//   url: DataAccessConfig.connectionString
// });

let expressApp;

export class Backend {
  private app: express.Application;
  private server: any;
  private io: any;
  private mongo: mongoose.MongooseThenable;
  private port: number;

  constructor() {
    // Create expressjs application
    this.app = express();

    // this.app.use(cookieParser('keyboard cat'));

    /**
     * @param  {} bodyParser.json(
     */
    this.app.use(bodyParser.json());
    // this.app.use(compression);

    // this.app.use(compression);
    this.app.use(session({
      key: 'connect.sid',
      store: sessionStore, //(options)
      secret: AuthConfig.secret,
      // saveUninitialized: true
    }));

    // use passport
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    // Setup routes
    this.routes();

    // Create server
    this.server = http.createServer(this.app);

    // Handle websockets
    this.sockets();

    // Handle logging
    this.logging();

    // Morgan
    if (ServerEnvironment.isDevEnv()) {
      this.app.use(morgan('dev'))
    }

    // set for export
    expressApp = this.app;
  }

  // Configure routes
  private routes(): void {
    // Setup router
    let router: express.Router;
    router = express.Router();

    // Root path
    const root = path.join(path.resolve(__dirname, './../../../dist'));
    console.log("root path");
    console.log(root);

    // this.app.set('view engine', 'html');

    // Static assets
    this.app.use('/assets', serveStatic(path.resolve(root, 'assets')));

    // Set router to serve index.html (e.g. single page app)
    router.get('/', (request: express.Request, result: express.Response) => {
      result.sendFile(path.join(root, '/index.html'));
    });

    // set server routes
    this.app.use('/', ServerRoutes.getAppWithRouters());

    // Set app to use router as the default route
    this.app.use('*', router);
  }

  // Configure sockets
  private sockets(): void {
    // Get socket.io handle
    this.io = socket(this.server);

    //in your passport.socketio setup
    //With Socket.io >= 1.0 (you will have the same setup for Socket.io <1)
    this.io.use(passportSocketIo.authorize({
      cookieParser: cookieParser, //optional your cookie-parser middleware function. Defaults to require('cookie-parser')
      passport: passport,
      key: 'connect.sid',       //make sure is the same as in your session settings in app.js
      secret: AuthConfig.secret,      //make sure is the same as in your session settings in app.js
      store: sessionStore,        //you need to use the same sessionStore you defined in the app.use(session({... in app.js
      // *optional* callback on success
      success: (data, accept) => {
        console.log('successful connection to socket.io');

        // The accept-callback still allows us to decide whether to
        // accept the connection or not.
        accept(null, true);
      },
      // *optional* callback on fail/error
      fail: (data, message, error, accept) => {
        if (error)
          throw new Error(message);
        console.log('failed connection to socket.io:', message);

        // We use this callback to log all of our failed connections.
        accept(null, false);
      }

    }));
    this.io.adapter(redis(REDIS_URL));

    // create chat socket
    let chat = new ChatSocket(this.io);

    // Set room socket
    let roomSocket = new RoomSocket(this.io);
  }

  private logging(): void {
    //Generic error handler. please add the route above this code. This should be last middleare.
    // production error handler
    // no stacktraces leaked to user
    this.app.use((err: any, req, res, next) => {
      //Logger.error("Erro catch by error handler: ", err.stack);
      res.status(err.status || 500).render('error', {
        message: err.message || "Internal Error",
        error: {}
      });
    });
  }

  public listen(): void {
    // Get port
    const port = process.env.PORT || ServerEnvironment.port;

    // Start listening
    this.server.listen(port);

    // add error handler
    this.server.on('error', error => {
      console.log('ERROR', error);
    });

    // start listening on port
    this.server.on('listening', () => {
      console.log(`==> Listening on port ${port}. Open up http://${ServerEnvironment.host}:${port}/ in your browser.`);
    });
  }
}

export { expressApp };
