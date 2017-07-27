import * as mongoose from "mongoose";

interface HolidayModel extends mongoose.Document {
    title: string;
    description: string;
    type: string;
    date: Date;
    year: string;
}

class HolidaySchema {

    static get schema() {
        var schema = new mongoose.Schema({
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: false
            },
            type: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            year: {
                type: String,
                required: true
            }
        });

        return schema;
    }
}

let schema;
// added below check as so that we can use the same models on client side
if (mongoose.model)
    schema = mongoose.model<HolidayModel>("Holidays", HolidaySchema.schema);

export { HolidayModel as IHolidayModel }
export { schema as HolidaySchema }