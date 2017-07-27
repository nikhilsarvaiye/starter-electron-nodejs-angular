/**
 * Author: @NikhilS
 */
import * as express from "express";
import * as passport from 'passport';
import { ApiResponse } from "../../../../core/api/response.api";
import { CanteenApi } from "./canteen.api";
import { AuthHandler } from './../../../../core/auth/auth.handler';

var router = express.Router();

export class CanteenRoutes {
    
    get routes () {
        
        /*
            params: pass in post body
            title: string;
            price: string;
            type: string;
            created: Date;
        */
        router.post('/item/create', AuthHandler.Authenticate, CanteenApi.createItem);
        /*
            params: pass in post body
            _id: string;
            title: string;
            price: string;
            type: string;
        */
        router.post('/item/update', AuthHandler.Authenticate, CanteenApi.updateItem);
        /*
            params: pass in post body
            _id: string;
        */
        router.post('/item/delete', AuthHandler.Authenticate, CanteenApi.deleteItem);
        /*
            params: pass in query parameters
            pageSize: number;
            pageNumber: number; 
        */
        router.get('/item/paginate', AuthHandler.Authenticate, CanteenApi.paginateItems);

        /*
            params: pass in post body
            item: string; -- item created earlier name
            itemId: string;  -- Optional
            quantity: Number; 
            menuDate: Date; -- todays's menu date 
        */
        router.post('/menuItem/create', AuthHandler.Authenticate, CanteenApi.createMenuItem);
        /*
            params: pass in post body
            _id: string;
            item: string; -- item created earlier name
            itemId: string;  -- Optional
            quantity: Number; 
            menuDate: Date; -- todays's menu date 
        */
        router.post('/menuItem/update', AuthHandler.Authenticate, CanteenApi.updateMenuItem);
        /*
            params: pass in post body
            _id: string;
        */
        router.post('/menuItem/delete', AuthHandler.Authenticate, CanteenApi.deleteMenuItem);
        /*
            params: pass in query parameters
            pageSize: number;
            pageNumber: number; 
        */
        router.get('/menuItem/paginate', AuthHandler.Authenticate, CanteenApi.paginateMenuItems);

        /*
            params: pass in post body
            menuItem: string; -- item created earlier name
            menuItemId: string; -- optional
            quantity: Number;
            userId: string;
        */
        router.post('/order/place', AuthHandler.Authenticate, CanteenApi.placeOrder);
        /*
            params: pass in post body
            _id: string;
            menuItem: string; -- item created earlier name
            menuItemId: string; -- optional
            quantity: Number;
            userId: string;
        */
        router.post('/order/update', AuthHandler.Authenticate, CanteenApi.updateOrder);
        /*
            params: pass in post body
            _id: string;
        */
        router.post('/order/delete', AuthHandler.Authenticate, CanteenApi.deleteOrder);
        /*
            params: pass in query parameters
            pageSize: number;
            pageNumber: number; 
        */
        router.get('/order/paginate', AuthHandler.Authenticate, CanteenApi.paginateOrders);

        return router;
    }
}

Object.seal(CanteenRoutes);
