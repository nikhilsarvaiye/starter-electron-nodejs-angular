import * as path from 'path';
import { ValidationHelper } from './../../core/validation/validation-helper'

export class UserConstants {
    static Messages = class {
        static Error = class {
            public static userIdRequired = ValidationHelper.getFieldRequiredMessage("UserId");
            public static passwordRequired = ValidationHelper.getFieldRequiredMessage("Password");
            public static firstnameRequired = ValidationHelper.getFieldRequiredMessage("First Name");
            public static lastnameRequired = ValidationHelper.getFieldRequiredMessage("Last Name");
            public static emailRequired = ValidationHelper.getFieldRequiredMessage("Email");
            public static confirmPasswordNotMatch = "Please Confirm your Password";
            public static userIdNotFound = "The UserId that you've entered doesn't match any account. Sign up for an account.";
            public static passwordNotMatch = "The Password that you've entered is incorrect. Have you forgotten password?";
        }
        static Success = class {
            public static userRegistered = "User registration has been done successfully. Login with your UserId and Password.";
        }
    }
    static Schemas = class {
        static Users = class {
            static Fields = class {
                public static _id = "_id";
                public static userId = "user_id";
                public static password = "password";
                public static salt = "salt";
                public static fullName = "name";
                public static firstname = "firstname";
                public static lastname = "lastname";
                public static email = "email";
            }
        }
    }
    static MailTemplates = class {
        static Register = class {
             public static dirPath = path.join(__dirname, 'mail-templates', 'register');   
        }
    }
}