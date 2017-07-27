import * as mongoose from "mongoose";

interface PolicyModel extends mongoose.Document {
    title: string;
    description: string;
    type: string;
    document: File;
}

class PolicySchema {

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
            document: {
                type: String
            }
        });

        return schema;
    }
}

let schema;
// added below check as so that we can use the same models on client side
if (mongoose.model)
    schema = mongoose.model<PolicyModel>("Policies", PolicySchema.schema);

export { PolicyModel as IPolicyModel }
export { schema as PolicySchema }