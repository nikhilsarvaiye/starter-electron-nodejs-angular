import * as express from 'express';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import { AuthConfig } from './../../../../config';
import { IUserModel } from "./../../../modules/user/models/user.model";
import { UserService } from "./../../../modules/user/user.service";
import { JwtStrategyOptions, JWTAuth } from './../../auth/strategies/jwt.strategy';

var localStrategy = passportLocal.Strategy;


class LocalStrategyOptions implements passportLocal.IStrategyOptionsWithRequest {
    public usernameField: string = 'user_id';
    public passwordField: string = 'password';
    public passReqToCallback: boolean = true;
}

class LocalVerifyOptions implements passportLocal.IVerifyOptions {
    public message: string = '';
    constructor(_message: string) {
        this.message = _message;
    }
}

export class LocalStrategy {

    public static GetLoginStrategy() {
        return new localStrategy(new LocalStrategyOptions(), function (req: express.Request, username: string, password: string, done) {
            new UserService().login(username, password, function (error: any, result: any) {
                if (error) return done(error);
                if (result.errors)
                    return done(null, result);
                return done(null, {
                    user: result,
                    token: JWTAuth.createToken(result)
                });
            });
        });
    }

    public static GetRegisterStrategy() {
        return new localStrategy(new LocalStrategyOptions(), function (req: express.Request, username: string, password: string, done) {
            var user = <IUserModel>req.body;
            new UserService().register(user, function (error: any, result: any) {
                console.log(error);
                if (error) return done(error);
                return done(null, result);
            });
        });
    }
}