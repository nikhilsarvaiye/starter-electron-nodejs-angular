import * as mongoose from "mongoose";

interface CanteenItemModel extends mongoose.Document {
    title: string;
    price: string;
    type: string;
    created: Date;
}

class CanteenItemSchema {

    static get schema() {
        var schema = new mongoose.Schema({
            title: {
                type: String,
                unique: true,
                required: true
            },
            price: {
                type: Number
            },
            type: {
                type: String
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
    schema = mongoose.model<CanteenItemModel>("CanteenItems", CanteenItemSchema.schema);
}
export { CanteenItemModel as ICanteenItemModel }
export { schema as CanteenItemSchema }