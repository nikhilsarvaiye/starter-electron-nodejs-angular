import * as mongoose from "mongoose";
//import { DataAccess } from '../../../core/dataAccess/dataAccess';

interface UserModel extends mongoose.Document {
    user_id: string;
    firstname: string;
    lastname: string;
    password: string;
    salt: string;
    email: string;
    isOnline: boolean;
}

class UserSchema {

    static get schema () {
        var schema =  new mongoose.Schema({
            user_id: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true,
                select: false
            },
            salt: {
                type: String,
                required: true,
                select: false
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            email:  {
                type: String,
                required: false,
                unique: false
            },
            firstname : {
                type: String,
                required: false
            },
            lastname: {
                type: String,
                required: false
            },
            isOnline: {
                type: Boolean,
                required: false
            }
        });

        return schema;
    }
}
//var schema = DataAccess.mongooseConnection.model<UserModel>("Users", UserSchema.schema);
var schema;
// added below check as so that we can use the same models on client side
if(mongoose.model)
    schema = mongoose.model<UserModel>("Users", UserSchema.schema);

export { UserModel as IUserModel }
export { schema as UserSchema }