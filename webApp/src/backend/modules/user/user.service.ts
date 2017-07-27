import * as express from "express";
import * as jwt from 'jsonwebtoken';
import * as mongoose from "mongoose";
import { ApiRequest } from './../../core/api/request.api'
import { ApiResponse } from './../../core/api/response.api'
import { PasswordAuth } from './../../core/auth/password.auth'
import { AppError, HandleError, HandleErrorResponse, HandleErrorTypes } from './../../core/error/error.handler'
import { Logger } from './../../core/logger/logger'
import { BaseService } from './../../core/service/base.service'
import { UserConstants } from "./user.constants";
import { IUserModel, UserSchema } from "./models/user.model";
import { UserValidation } from "./models/user.model.validation";
import { Mail, MailOptions } from './../../core/mail/mail.sender';
import { TimeTracker, TimeTrackerTypes } from './../../../models';

export class UserService extends BaseService<IUserModel> {
    constructor() {
        super(UserSchema);
    }

    /**
     * @param  {userId} string
     * @param  {password} string
     * @param  {(error:any,result:any)=>void} callback
     */
    login(userId: string, password: string, callback: (error: any, result: any) => void) {
        try {
            let fields = UserConstants.Schemas.Users.Fields;
            let errorMessages = UserConstants.Messages.Error;
            let selectFields = `
                ${fields._id} ${fields.userId} ${fields.password} ${fields.salt} 
                ${fields.firstname} ${fields.lastname}
                `;
            // validate Form
            let handleErrorResponse = UserValidation.validateLoginForm(userId, password);
            if (handleErrorResponse.errors)
                callback(null, handleErrorResponse);

            this.repository.find({ user_id: userId }, (error: any, result: IUserModel[]) => {
                if (error || !result)
                    callback(error, null);
                else {
                    if (result.length > 0) {
                        var user = result[0];
                        Logger.info(`User found with UserId ${user.user_id}, Checking if password matches ${user.user_id}`);
                        console.log('enterred user.password '+ password);
                        PasswordAuth.getPasswordByHashSalt(password, user.salt, (error: any, hashPassword: string) => {
                            if (error)
                                callback(error, null);
                            else {
                                console.log('user.password '+ user.password);
                                console.log('hashPassword '+ hashPassword);
                                if (user.password == hashPassword) {
                                    //delete secured fields
                                    delete user.password;
                                    delete user.salt;
                                    var filterUser = <IUserModel>{};
                                    for (const key in user) {
                                        if (key != 'password' && key != 'salt') {
                                            filterUser[key] = user[key];
                                        }
                                    }
                                    Logger.info(`Authentication Successful for User ${user.user_id}`);
                                    
                                    /* add time tracker entry */
                                    TimeTracker.add(filterUser.user_id, TimeTrackerTypes.LogIn);
                                    
                                    callback(null, filterUser);
                                }
                                else {
                                    Logger.error(errorMessages.passwordNotMatch);
                                    callback(null, new HandleErrorResponse(new HandleError(errorMessages.passwordNotMatch)));
                                }
                            }
                        });
                    }
                    else {
                        Logger.error(errorMessages.userIdNotFound);
                        callback(null, new HandleErrorResponse(new HandleError(errorMessages.userIdNotFound, HandleErrorTypes.DATABASE)));
                    }
                }
            }, selectFields);

        } catch (e) {
            Logger.handleExceptions(e);
            callback(e, null);
        }
    }

    /**
     * @param  {IUserModel} user
     * @param  {(error:any,result:any)=>void} callback
     */
    register(user: IUserModel, callback: (error: any, result: any) => void) {
        try {
            // validate Form
            let handleErrorResponse = UserValidation.validateRegisterForm(user);
            if (handleErrorResponse.errors)
                callback(null, handleErrorResponse);
            else {
                PasswordAuth.generateHashSalt(user.password, (error: any, password: string, salt: string) => {
                    if (error)
                        callback(error, null);
                    else {
                        user.password = password;
                        user.salt = salt;
                        this.repository.create(user, (error: any, result: any) => {
                            if (error)
                                callback(error, null)
                            else {
                                result = result.toJSON();
                                let mailOptions = <MailOptions>{};
                                mailOptions.to = user.email;
                                if (mailOptions.to) {
                                    console.log(`Sending email to ${mailOptions.to}`);
                                    new Mail().sendOneWithTemplate(mailOptions, UserConstants.MailTemplates.Register.dirPath, result, (error: Error, info: any) => {
                                        if (error) {
                                            return callback(error, result);
                                        } else {
                                            return callback(null, result);
                                        }
                                    });
                                }
                                else {
                                    return callback(null, result);
                                }
                            }
                        });
                    }

                });
            }
        } catch (e) {
            Logger.handleExceptions(e);
            callback(e, null);
        }
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
     * @param  {string} key
     * @param  {(error:any,result:any)=>void} callback
     */
    getUserByUserId(userId: string, callback: (error: any, result: any) => void) {
        this.repository.findOne({ user_id: { "$regex": userId, "$options": "i" } }, callback);
    }

    /**
     * @param  {string} selectFields
     * @param  {number} pageSize
     * @param  {number} pageNumber
     * @param  {(error:any,result:any)=>void} callback
     */
    paginate(pageSize: number, pageNumber: number, callback: (error: any, result: any) => void) {
        const selectFields = `${UserConstants.Schemas.Users.Fields.userId} ${UserConstants.Schemas.Users.Fields.firstname} ${UserConstants.Schemas.Users.Fields.lastname}`;
        const sortBy = UserConstants.Schemas.Users.Fields.firstname;
        this.repository.paginate({}, selectFields, pageSize, pageNumber, sortBy, callback);
    }

    /**
    * @param  {string} _id
    * @param  {IUserModel} item
    * @param  {(error:any,result:any)=>void} callback
    */
    update(_id: string, item: IUserModel, callback: (error: any, result: any) => void) {
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
    findById(_id: string, callback: (error: any, result: IUserModel) => void) {
        this.repository.findById(_id, callback);
    }
}

Object.seal(UserService);
