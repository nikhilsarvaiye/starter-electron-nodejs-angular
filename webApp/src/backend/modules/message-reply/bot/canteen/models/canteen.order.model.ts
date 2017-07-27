import * as mongoose from "mongoose";

interface CanteenOrderModel extends mongoose.Document {
    menuItem: string;
    menuItemId: string;
    quantity: Number;
    userId: string;
    created: Date;
}

class CanteenOrderSchema {

    static get schema() {
        var schema = new mongoose.Schema({
            menuItem: {
                type: String,
                required: true
            },
            menuItemId: {
                type: String
            },
            userId: {
                type: String,
                required: true
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
    schema = mongoose.model<CanteenOrderModel>("CanteenOrders", CanteenOrderSchema.schema);
}
export { CanteenOrderModel as ICanteenOrderModel }
export { schema as CanteenOrderSchema }