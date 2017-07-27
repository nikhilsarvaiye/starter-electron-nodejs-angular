import * as mongoose from "mongoose";
import { HandleError, HandleErrorResponse, HandleErrorTypes } from './../../../core/error/error.handler'
import { UserConstants } from "./../user.constants";
import { IUserModel } from "./user.model";

export class UserValidation {

    public static validateLoginForm(userId: string, password: string): HandleErrorResponse {
        let handleErrors = new Array<HandleError>();
        if (!userId) {
            handleErrors.push(new HandleError(UserConstants.Messages.Error.userIdRequired));
        }
        if (!password) {
            handleErrors.push(new HandleError(UserConstants.Messages.Error.passwordRequired));
        }
        return new HandleErrorResponse(handleErrors.length ? handleErrors : null);
    }

    public static validateRegisterForm(user: IUserModel): HandleErrorResponse {
        let handleErrors = new Array<HandleError>();
        if (!user.user_id) {
            handleErrors.push(new HandleError(UserConstants.Messages.Error.userIdRequired));
        }
        if (!user.password) {
            handleErrors.push(new HandleError(UserConstants.Messages.Error.passwordRequired));
        }
        if (((<any>user).confirmPassword) && user.password) {
            if (((<any>user).confirmPassword) != user.password) {
                handleErrors.push(new HandleError(UserConstants.Messages.Error.confirmPasswordNotMatch));
            }
        }
        if (!user.firstname) {
            handleErrors.push(new HandleError(UserConstants.Messages.Error.firstnameRequired));
        }
        if (!user.lastname) {
            handleErrors.push(new HandleError(UserConstants.Messages.Error.lastnameRequired));
        }
        if (!user.email) {
            handleErrors.push(new HandleError(UserConstants.Messages.Error.emailRequired));
        }
        return new HandleErrorResponse(handleErrors.length ? handleErrors : null);
    }
}
