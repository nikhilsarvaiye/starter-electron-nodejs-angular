import * as path from 'path';
import { ValidationHelper } from './../../core/validation/validation-helper'

export class FeedConstants {
    static Messages = class {
        static Error = class {
            public static passwordRequired = ValidationHelper.getFieldRequiredMessage("Password");
                 }
        static Success = class {
            public static FeedRegistered = "Feed has been posted successfully.";
        }
    }
    static Schemas = class {
        static Feed = class {
            static Fields = class {
                public static from = "from";
                public static to = "to";
                public static text = "text";
                public static comments="comments";
                public static images = "images";
                public static isExternal = "isExternal";
                public static url = "url";
                public static likes = "likes";
                public static created = "created";
            }
        }
    }
    // static MailTemplates = class {
    //     static Register = class {
    //          public static dirPath = path.join(__dirname, 'mail-templates', 'register');   
    //     }
    // }
}