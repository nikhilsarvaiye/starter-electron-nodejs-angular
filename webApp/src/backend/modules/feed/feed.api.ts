import * as express from "express";
import * as passport from 'passport';
import { ApiRequest } from './../../core/api/request.api';
import { ApiResponse } from './../../core/api/response.api';
import { AppError } from './../../core/error/error.handler';
import { Logger } from './../../core/logger/logger'
import { LocalStrategy } from './../../core/auth/strategies/local.strategy';
import { IFeedModel } from './models/feed.model';
import { FeedService } from './feed.service';

export class FeedApi {

    static saveFeed(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var body = <IFeedModel>req.body;
            new FeedService().saveFeed(body, function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }
    static getFeedById(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var body = req.query;
            new FeedService().getFeedById(body.key, function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }

    static saveLikeByUserId(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var body = <IFeedModel>req.body;
            new FeedService().update(body.id, body, function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }

    static paginate(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var body = req.query;
            new FeedService().paginate(parseInt(body.pageSize), parseInt(body.pageNumber), function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }
}

Object.seal(FeedApi);
