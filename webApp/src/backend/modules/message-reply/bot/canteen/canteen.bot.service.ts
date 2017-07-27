import * as express from "express";
import * as jwt from 'jsonwebtoken';
import * as mongoose from "mongoose";
import { ApiRequest } from './../../../../core/api/request.api'
import { ApiResponse } from './../../../../core/api/response.api'
import { PasswordAuth } from './../../../../core/auth/password.auth'
import { AppError, HandleError, HandleErrorResponse, HandleErrorTypes } from './../../../../core/error/error.handler'
import { Logger } from './../../../../core/logger/logger'
import { Mail, MailOptions } from './../../../../core/mail/mail.sender';
import { ApiAIConfig } from './../../../../../config';
const apiai = require('apiai');

export class CanteenBotService {

    private app: any;

    constructor() {
        this.app = apiai(ApiAIConfig.apiKey);
    }

    /**
     * @param  {string} message
     * @param  {(error:any,result:any)=>void} callback
     */
    getActions(message: string, callback: (error: any, result: any) => void) {
        this.app.textRequest(message, {
            sessionId: '<unique session id>'
        })
            .on('response', function (response) {
                console.log(response);
                // return will callback so that message service can emit the message                

              //   var speechResponse = response.result.fulfillment.speech;

            //var fulfillmentMessages = response.result.fulfillment.messages;

           // console.log(speechResponse);

                //callback(null, speechResponse);
                callback(null, response);
            })
            .on('error', function (error) {
                console.log(error);
                // return will callback so that message service can emit the message
                callback(error, '');
            })
            .end();
    }
}

Object.seal(CanteenBotService);
