import { PolicyConstants } from './policy.constants';
import * as express from "express";
import * as jwt from 'jsonwebtoken';
import * as mongoose from "mongoose";
import { ApiRequest } from './../../../../core/api/request.api'
import { ApiResponse } from './../../../../core/api/response.api'
import { PasswordAuth } from './../../../../core/auth/password.auth'
import { AppError, HandleError, HandleErrorResponse, HandleErrorTypes } from './../../../../core/error/error.handler'
import { Logger } from './../../../../core/logger/logger'
import { BaseService } from './../../../../core/service/base.service'
import { BaseRepository } from './../../../../core/repository/base.repository'
import { Mail, MailOptions } from './../../../../core/mail/mail.sender';
import { IPolicyModel, PolicySchema } from "./models/policy.model";

export class PolicyService extends BaseService<IPolicyModel> {

    constructor() {
        super(PolicySchema);
    }

    /**
     * @param  {IPolicyModel} item
     * @param  {(error:any,result:any)=>void} callback
     */
    createItem(item: IPolicyModel, callback: (error: any, result: any) => void) {
        this.repository.create(item, callback);
    }

    /**
     * @param  {string} _id
     * @param  {IPolicyModel} item
     * @param  {(error:any,result:any)=>void} callback
     */
    updateItem(_id: string, item: IPolicyModel, callback: (error: any, result: any) => void) {
        this.repository.update(mongoose.Types.ObjectId(_id), item, callback);
    }

    /**
     * @param  {string} _id
     * @param  {(error:any,result:any)=>void} callback
     */
    deleteItem(_id: string, callback: (error: any, result: any) => void) {
        this.repository.delete(_id, callback);
    }

    /**
     * @param  {string} selectFields
     * @param  {number} pageSize
     * @param  {number} pageNumber
     * @param  {(error:any,result:any)=>void} callback
     */
    paginateItems(pageSize: number, pageNumber: number, callback: (error: any, result: any) => void) {
        const sortBy = PolicyConstants.Schemas.Items.Fields.title;
        this.repository.paginate({}, null, pageSize, pageNumber, sortBy, callback);
    }

    /**
     * @param  {string} key
     * @param  {(error:any,result:any)=>void} callback
     */
    search(key: IPolicyModel, callback: (error: any, result: any) => void) {
        const selectFields = '';
        let index: number = 0;
        Object.keys(key).map(d => {
            if (key[d]) {
                key[d] = { "$regex": key[d], "$options": "i" };
                index++;
            } else {
                delete key[d];
            }
        });
        if (index > 0) {
            this.repository.find(index === 1 ? key : { $and: key }, callback);
        } else {
            this.repository.find({}, callback);
        }
    }
}

Object.seal(PolicyService);
