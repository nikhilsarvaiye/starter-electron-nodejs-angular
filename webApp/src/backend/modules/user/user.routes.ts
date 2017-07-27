/**
 * Author: @NikhilS
 */
import * as express from "express";
import * as passport from 'passport';
import { ApiResponse } from "../../core/api/response.api";
import { UserApi } from "./user.api";
import { AuthHandler } from './../../core/auth/auth.handler';

var router = express.Router();



export class UserRoutes {
    
    get routes () {
        router.get('/userId', AuthHandler.Authenticate, UserApi.getUserByUserId);
        router.get('/paginate', AuthHandler.Authenticate, UserApi.paginate);
        router.get('/search', AuthHandler.Authenticate, UserApi.searchUsers);
        return router;
    }
}

export class AuthRoutes {
    
    get routes () {
        // router.get('/getdata', AuthHandler.Authenticate, UserApi.getData);
        router.get('/azurelogin', AuthHandler.AzureLogin, UserApi.azureLogin);
        router.post('/login', AuthHandler.Login, UserApi.login);
        router.post('/register', AuthHandler.Register, UserApi.register);
        return router;
    }
}

Object.seal(UserRoutes);
