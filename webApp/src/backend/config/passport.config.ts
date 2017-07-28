import * as passport from 'passport';
import { LocalStrategy } from './../core/auth/strategies/local.strategy';
import { JwtStrategy } from './../core/auth/strategies/jwt.strategy';


passport.serializeUser(function (user, done) {
     console.log("Trying to serializeUser user");
     done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, (<any>user) ? (<any>user).user : null);
});

// use passport
passport.use('jwt', JwtStrategy.GetStrategy());
passport.use('local-login', LocalStrategy.GetLoginStrategy());
passport.use('local-register', LocalStrategy.GetRegisterStrategy());

export { passport }
