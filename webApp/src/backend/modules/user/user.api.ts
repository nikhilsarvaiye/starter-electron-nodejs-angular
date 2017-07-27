import * as express from "express";
import * as passport from 'passport';
import { ApiRequest } from './../../core/api/request.api';
import { ApiResponse } from './../../core/api/response.api';
import { AppError } from './../../core/error/error.handler';
import { Logger } from './../../core/logger/logger'
import { LocalStrategy } from './../../core/auth/strategies/local.strategy';
import { UserService } from './user.service';

export class UserApi {

    static getUserByUserId(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var body = req.query;
            new UserService().getUserByUserId(body.userId, function (error: any, result: any) {
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
            new UserService().paginate(parseInt(body.pageSize), parseInt(body.pageNumber), function (error: any, result: any) {
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

    static searchUsers(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var body = req.query;
            new UserService().searchUsers(body.key, function (error: any, result: any) {
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

    static login(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            console.log("in method user api login");
            const result = (<any>req).result;
            req.logIn(result, function (err) {
                console.log("in method req.logIn");
                if (err) {
                    return res.status(401).send(new ApiResponse(correlationId, err));
                }
                res.status(200).send(new ApiResponse(correlationId, (<any>req).result));
            });
            console.log("in method user api login after req.login");
            // res.status(200).send(new ApiResponse(correlationId, (<any>req).result));
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse(correlationId, e));
        }
    }

    static register(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            res.status(200).send(new ApiResponse(correlationId, (<any>req).result));
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse(correlationId, e));
        }
    }

    static azureLogin(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            res.status(200).send(new ApiResponse(correlationId, (<any>req).result));
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse(correlationId, e));
        }
    }
}

Object.seal(UserApi);
