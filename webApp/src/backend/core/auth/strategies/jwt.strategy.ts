import * as express from 'express';
import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { AuthConfig } from './../../../../config';
import { IUserModel } from "./../../../modules/user/models/user.model";
import { UserService } from "./../../../modules/user/user.service";

var ExtractJwt = passportJWT.ExtractJwt;
var jwtStrategy = passportJWT.Strategy;

class JwtStrategyOptions implements passportJWT.StrategyOptions{
    public jwtFromRequest: passportJWT.JwtFromRequestFunction = ExtractJwt.fromAuthHeader();
    public secretOrKey: string = AuthConfig.secret;
    // to-do
    // issuer = 'accounts.examplesoft.com';
    // audience = 'yoursite.net';
}

class JwtStrategy {
    
    public static GetStrategy() {
        let _this = this;
        return new jwtStrategy(new JwtStrategyOptions(), function(jwt_payload, next) {
            // console.log('payload received', jwt_payload);
            // get user from database
            // new UserService().findById(jwt_payload.sub, (error, result) => {
            //     if (error) {
            //         next(error, null);
            //     }
            //     else {
            //         jwt_payload.user = result;
            //         next(null, jwt_payload);
            //     }
            // });   
            next(null, jwt_payload); 
        });
    }
}

class JWTVerifyOptions implements jwt.VerifyOptions {
    public algorithms: string[] = [AuthConfig.algorithm];
    // audience?: string | string[];
    // clockTolerance?: number;
    // issuer?: string | string[];
    // ignoreExpiration?: boolean;
    // ignoreNotBefore?: boolean;
    // jwtId?: string;
    // subject?: string;
    // /**
    //  *@deprecated
    //  *@member {string} - Max age of token
    //  */
    // maxAge?: string;
}

class JWTAuth {
    private static secret: string = AuthConfig.secret;
    private static algorithm: string = AuthConfig.algorithm;
    private static authHeaderKey: string = 'authorization';

    public static createToken(user: IUserModel) {
        let payload = {
            sub: user._id,
            user: user,
            exp: moment().add(10, 'hours').unix()//60
        }
        return 'JWT ' + jwt.sign(payload, this.secret);
    }

    public static createAndSendToken(user: IUserModel, res: express.Response) {
        var token = this.createToken(user);
        res.status(200).send({
            user: user,
            token: token
        });
    }

    public static containsJWTToken(req: express.Request) {
        if(req.headers[this.authHeaderKey])
            return true;
        return false;
    }
    
    public static verifyJWTToken(req: express.Request) {
        let token = this.getTokenFromRequest(req);
        return jwt.verify(token, this.secret, new JWTVerifyOptions());
    }

    public static tokenInterceptor(req, res, next) {
        if (!req.headers.authorization) {
            this.sendUnAuthorizeResposne(res);
        } else {
            let token = this.getTokenFromRequest(req);
            try {
                req.decodedToken = this.verifyJWTToken(token);
            } catch (err) {
                if (err.name === "TokenExpiredError") {
                    res.status(419).send({
                        message: "Previously valid authentication has expired. Please Login Again"
                    });
                } else {
                    this.sendUnAuthorizeResposne(res);
                }
            }
            next();
        }
    }

    public static sendUnAuthorizeResposne(res: express.Response) {
        //res.status(401).send({ message: "You are not Authorized" });
        res.redirect('#/login', 401);
    }

    private static getTokenFromRequest(req){
        return req.headers[this.authHeaderKey].split(" ")[1];;
    }
}

export { JwtStrategy }
export { JwtStrategyOptions }
export { JWTAuth }