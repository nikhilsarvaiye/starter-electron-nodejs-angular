/**
 * Author: @NikhilS
 */
import * as express from "express";
import * as passport from 'passport';
import { ApiResponse } from "../../core/api/response.api";
import { FeedApi } from "./feed.api";
import { AuthHandler } from './../../core/auth/auth.handler';

var router = express.Router();



export class FeedRoutes {

    get routes() {
        router.post('/post', AuthHandler.Authenticate, FeedApi.saveFeed);
        router.post('/getFeedById', AuthHandler.Authenticate, FeedApi.getFeedById);
        router.get('/paginate', AuthHandler.Authenticate, FeedApi.paginate);
        router.get('/updateFeed', AuthHandler.Authenticate, FeedApi.saveLikeByUserId);
        router.get('/external', AuthHandler.Authenticate, FeedApi.saveFeed);
        return router;
    }
}

Object.seal(FeedRoutes);
