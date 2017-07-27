import * as path from 'path';
import { ValidationHelper } from './../../../../core/validation/validation-helper'

export class CanteenConstants {
    static Messages = class {
        static Error = class {
            public static itemTitleRequired = ValidationHelper.getFieldRequiredMessage("Title");
            public static itemTypeRequired = ValidationHelper.getFieldRequiredMessage("Type");
            public static itemPriceRequired = ValidationHelper.getFieldRequiredMessage("Price");
        }
        static Success = class {
            public static itemAdded = "Canteen Item has been done successfully.";
            public static menuAdded = "Canteen Menu Item has been done successfully.";
        }
    }
    static Schemas = class {
        static Items = class {
            static Fields = class {
                public static _id = "_id";
                public static title = "title";
                public static type = "type";
                public static price = "price";
                public static created = "created";
            }
        }
        static MenuItems = class {
            static Fields = class {
                public static _id = "_id";
                public static item = "item";
                public static itemId = "itemId";
                public static quantity = "quantity";
                public static menuDate = "menuDate";
                public static created = "created";
            }
        }
        static Orders = class {
            static Fields = class {
                public static _id = "_id";
                public static menuItem = "menuItem";
                public static menuItemId = "menuItemId";
                public static quantity = "quantity";
                public static created = "created";
            }
        }
    }
    static MailTemplates = class {
        static CanteenItem = class {
             public static dirPath = path.join(__dirname, 'mail-templates', 'register');   
        }
    }
}