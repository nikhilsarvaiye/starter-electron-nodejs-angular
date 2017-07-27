import * as path from 'path';

export class HolidayConstants {
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
        static HolidayItem = class {
             public static dirPath = path.join(__dirname, 'mail-templates', 'register');   
        }
    }
}