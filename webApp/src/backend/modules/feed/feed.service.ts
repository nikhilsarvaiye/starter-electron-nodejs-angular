import * as express from "express";
import * as jwt from 'jsonwebtoken';
import * as mongoose from "mongoose";
import { ApiRequest } from './../../core/api/request.api'
import { ApiResponse } from './../../core/api/response.api'
import { PasswordAuth } from './../../core/auth/password.auth'
import { AppError, HandleError, HandleErrorResponse, HandleErrorTypes } from './../../core/error/error.handler'
import { Logger } from './../../core/logger/logger'
import { BaseService } from './../../core/service/base.service'
import { FeedConstants } from "./feed.constants";
import { IFeedModel, FeedSchema } from "./models/feed.model";
import { FeedValidation } from "./models/feed.model.validation";
import { Mail, MailOptions } from './../../core/mail/mail.sender';
import { TimeTracker, TimeTrackerTypes } from './../../../models';

export class FeedService extends BaseService<IFeedModel> {
    constructor() {
        super(FeedSchema);
    }

    /**
     * @param  {string} key
     * @param  {(error:any,result:any)=>void} callback
     */
    searchUsers(key: string, callback: (error: any, result: any) => void) {
        const selectFields = '';
        this.repository.find({
            $or: [
                { firstname: { "$regex": key, "$options": "i" } },
                { lastname: { "$regex": key, "$options": "i" } },
                { email: { "$regex": key, "$options": "i" } },
                { user_id: { "$regex": key, "$options": "i" } },
            ]
        }, callback);
    }

    /**
    * @param  {string} _id
    * @param  {IUserModel} item
    * @param  {(error:any,result:any)=>void} callback
    */
    update(_id: string, item: IFeedModel, callback: (error: any, result: any) => void) {
        this.repository.update(mongoose.Types.ObjectId.createFromHexString(_id), item, callback);
    }

    /**
     * @param  {string} _id
     * @param  {(error:any,result:any)=>void} callback
     */
    delete(_id: string, callback: (error: any, result: any) => void) {
        this.repository.delete(_id, (err) => callback(err, null));

    }

    /**
     * @param  {string} _id
     * @param  {(error:any,result:T)=>void} callback
     */
    findById(_id: string, callback: (error: any, result: IFeedModel) => void) {
        this.repository.findById(_id, callback);
    }
}

Object.seal(FeedService);
