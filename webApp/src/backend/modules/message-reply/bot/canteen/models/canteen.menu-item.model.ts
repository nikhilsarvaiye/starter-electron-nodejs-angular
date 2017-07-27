import * as mongoose from "mongoose";

interface CanteenMenuItemModel extends mongoose.Document {
    item: string;
    itemId: string;
    quantity: Number;
    menuDate: Date;
    created: Date;
}

class CanteenMenuItemSchema {

    static get schema() {
        var schema = new mongoose.Schema({
            item: {
                type: String,
                required: true
            },
            itemId: {
                type: String
            },
            menuDate: {
                type: Date
            },
            created: {
                type: Date,
                default: Date.now
            }
        });

        return schema;
    }
}

var schema;
// added below check as so that we can use the same models on client side
if (mongoose.model) {
    schema = mongoose.model<CanteenMenuItemModel>("CanteenMenuItems", CanteenMenuItemSchema.schema);
}
export { CanteenMenuItemModel as ICanteenMenuItemModel }
export { schema as CanteenMenuItemSchema }