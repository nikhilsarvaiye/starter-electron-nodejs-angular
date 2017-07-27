import * as path from 'path';

export class PolicyConstants {
    static Schemas = class {
        static Items = class {
            static Fields = class {
                public static _id = "_id";
                public static title = "title";
                public static type = "type";
                public static description = "description";
                public static date = "date";
                public static year = "year";
            }
        }
    }
    static MailTemplates = class {
        static PolicyItem = class {
            public static dirPath = path.join(__dirname, 'mail-templates', 'register');
        }
    }
}