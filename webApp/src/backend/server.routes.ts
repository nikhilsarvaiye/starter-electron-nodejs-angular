/**
 * Author: @NikhilS
 */
/**
 * Server-side routes. Only the listed routes support html5pushstate.
 * Has to match client side routes.
 *
 * Index (/) route does not have to be listed here.
 **/

import * as express from "express";
import * as path from "path";
import { AuthRoutes, UserRoutes } from './modules/user/user.routes';
import { CanteenRoutes } from './modules/message-reply/bot/canteen/canteen.routes';

const app = express();
const router = express.Router();

export class ServerRoutes {

    static getAppWithRouters(): express.Application {

        app.use("/auth", new AuthRoutes().routes);
        app.use("/api/user", new UserRoutes().routes);
        app.use("/api/canteen", new CanteenRoutes().routes);
        
        // Set app to use router as the default route
        app.use('*', router);

        return app;
    }
}
