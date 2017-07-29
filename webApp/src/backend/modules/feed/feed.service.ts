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
     * @param  {IUserModel} item
     * @param  {(error:any,result:any)=>void} callback
     */
    saveFeed(item: IFeedModel, callback: (error: any, result: any) => void) {
        this.repository.create(item, callback);
    }

    /**
      * @param  {string} _id
      * @param  {(error:any,result:T)=>void} callback
      */
    getFeedById(_id: string, callback: (error: any, result: IFeedModel) => void) {
        this.repository.findById(_id, callback);
    }

    /**
    * @param  {string} selectFields
    * @param  {number} pageSize
    * @param  {number} pageNumber
    * @param  {(error:any,result:any)=>void} callback
    */
    paginate(pageSize: number, pageNumber: number, callback: (error: any, result: any) => void) {
        const selectFields = `${FeedConstants.Schemas.Feed.Fields.from} ${FeedConstants.Schemas.Feed.Fields.to} ${FeedConstants.Schemas.Feed.Fields.images} ${FeedConstants.Schemas.Feed.Fields.isExternal} ${FeedConstants.Schemas.Feed.Fields.likes} ${FeedConstants.Schemas.Feed.Fields.text} ${FeedConstants.Schemas.Feed.Fields.url}`;
        const sortBy = FeedConstants.Schemas.Feed.Fields.created;
        this.repository.paginate({}, '', pageSize, pageNumber, sortBy, callback);
    }

    /**
    * @param  {string} _id
    * @param  {IUserModel} item
    * @param  {(error:any,result:any)=>void} callback
    */
    like(_id: string, userId: string, callback: (error: any, result: any) => void) {
        this.repository.findById(_id, (error: any, result: any) => {
            if (error) {
                callback(error, null);
            }
            else {
                console.log('like getting result');
                console.log(result);
                const item = result;
                item.likes = item.likes || [];
                item.likes.push({
                    emotion: 'Like',
                    userId: userId
                });
                this.repository.update(mongoose.Types.ObjectId.createFromHexString(_id), item, callback);
            }
        });
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
