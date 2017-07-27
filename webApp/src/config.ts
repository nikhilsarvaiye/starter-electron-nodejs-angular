/**
 * @author: @NikhilS
 */
import * as path from 'path';

export class LoggerConfig {
    public static logDirectory = "./../logs";
}

export class DataAccessConfig {
    // set database connection string
    // public static connectionString = `mongodb://nconnect:nconnect123@ds155132.mlab.com:55132/nconnect`;
    public static redisConnectionString = process.env.NODE_ENV === 'production' ? process.env.REDIS_URL : 
                "redis://127.0.0.1:6379";
    public static connectionString = process.env.NODE_ENV === 'production' ? process.env.dbURI : 
                "mongodb://10.11.13.164:27017/nConnect_development";
}

export class AuthConfig {
    public static session: Boolean = true;
    public static proxy: Boolean = true;
    public static secret: string = "nConnect";
    public static algorithm: string = "HS512";
}

export class EmailServices {
    public static GMAIL: string = "Gmail";
    public static SMTP: string = "Smtp";
}

export class EmailConfig {
    public static defaultService: string = EmailServices.GMAIL;
    
    static GmailOptions = class {
        public static username: string = "nikheelsarvaiye@gmail.com";
        public static password: string = "summer@days";
        public static from: string = 'Nikhil Sarvaiye <nikheelsarvaiye@gmail.com>';
    }

    static SmptOptions = class {
        public static host: string = "mail.nitorinfotech.com";
        public static username: string = "nikhils@nitorinfotech.com";
        public static password: string = "asdasdasd";
        public static secure: boolean = true;
        public static port: number = 465;
        public static secret: string = "NikhilS";
        public static from: string = 'Nikhil Sarvaiye <nikhils@nitorinfotech.com>';
    }

    static EmailOptions = class {
        
    }
}

export class ServerEnvironment {
    
    public static root: String = path.join.bind(path, path.resolve(__dirname, '..'));
    public static port: Number = process.env.PORT || 4000;
    public static host: String = '127.0.0.1'; //process.env.HOST || 
    public static env: any = process.env.NODE_ENV;
    public static serveStatic: Boolean = false;

    public static getResolvedAbsolutePath(_path: string): string{
        return path.resolve(_path);
    }

    public static hasProcessFlag(flag){
        return process.argv.join('').indexOf(flag) > -1;
    }
    public static hasNpmFlag(flag) {
      const EVENT = process.env.npm_lifecycle_event || '';
      return EVENT.includes(flag);
    }
    
    public static isWebpackDevServer() {
      return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
    }

    public static isDevEnv() {
      return process.env.NODE_ENV == 'development'
    }
}

export class ApiAIConfig {
    public static apiKey = '5e4ac5c488124d88a9fc909b76d93841';
}

