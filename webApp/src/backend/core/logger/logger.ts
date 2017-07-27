import * as fs from 'fs';
import * as winston from 'winston';
import { LoggerConfig } from './../../../config';
import * as morgan from 'morgan';

if ( !fs.existsSync(LoggerConfig.logDirectory) ) {
	// Create the directory if it does not exist
	fs.mkdirSync( LoggerConfig.logDirectory );
}

var Logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            name: 'log-file',
            filename: LoggerConfig.logDirectory + '/application.log',
            handleExceptions: true,
            json: false,
            maxsize: 5242880, //5MB
            maxFiles: 10,
            colorize: true
        }),
        new winston.transports.Console({
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

class LoggerStreamOptions implements morgan.StreamOptions{
    write(message: string): void{
        Logger.info(message);
    }
}

class LoggerMorgonOptions implements morgan.Options{
    public stream: morgan.StreamOptions = new LoggerStreamOptions();
}

var LoggerStream = {
    write: function(message, encoding) {
        Logger.info(message);
    }
};

export { Logger }
export { LoggerStream }
export { LoggerMorgonOptions }
