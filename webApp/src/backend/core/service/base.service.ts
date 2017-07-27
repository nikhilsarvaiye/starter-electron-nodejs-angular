import * as mongoose from "mongoose";
import { BaseRepository } from "./../repository/base.repository";

export class BaseService<T extends mongoose.Document>  {
    
    public repository: BaseRepository<T>;
    
    constructor (schemaModel: mongoose.Model<mongoose.Document>) {
        this.repository = new BaseRepository<T>(schemaModel);
    } 
}

Object.seal(BaseService);