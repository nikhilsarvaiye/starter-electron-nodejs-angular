import * as express from 'express';
import * as passport from 'passport';
import { AppError } from './../error/error.handler';
import { ApiResponse } from './../api/response.api';
import { JwtStrategyOptions, JWTAuth } from './strategies/jwt.strategy';

export class AuthHandler {

    public static Authenticate(req: express.Request, res: express.Response, next): void {
        passport.authenticate('jwt', function (err, result, info) {
            if (err) { return next(err); }
            if (!result) {
                //info.name == "TokenExpiredError"
                //info.name == "JsonWebTokenError
                return res.status(401).send(new ApiResponse((<any>res).correlationId, null, new AppError(info ? info.message : "Unauthorized")));
            }
            (<any>req).payload = result;
            (<any>req).user = result.user;
            return next();
        })(req, res, next);
    }

    public static Login(req: express.Request, res: express.Response, next): void {
        passport.authenticate('local-login', function (err, result, info) {
            if (err) { return next(err); }
            (<any>req).result = result;
            return next();
        })(req, res, next);
    }

    public static Register(req: express.Request, res: express.Response, next): void {
        passport.authenticate('local-register', function (err, result, info) {
            if (err) { return next(err); }
            (<any>req).result = result;
            return next();
        })(req, res, next);
    }

    public static AzureLogin(req: express.Request, res: express.Response, next): void {
        passport.authenticate('azure-login', function (err, result, info) {
            if (err) { return next(err); }
            (<any>req).result = result;
            return next();
        })(req, res, next);
    }
}