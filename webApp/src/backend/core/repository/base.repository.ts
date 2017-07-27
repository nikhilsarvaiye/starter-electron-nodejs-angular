
import * as mongoose from "mongoose";
import { IRead } from "./interfaces/read";
import { IWrite } from "./interfaces/write";

/**
 * @param  {mongoose.Model<mongoose.Document>} schemaModel
 */
export class BaseRepository<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    /**
     * @param  {T} item
     * @param  {(error:any,result:any)=>void} callback
     */
    create(item: T, callback: (error: any, result: any) => void) {
        this._model.create(item, callback);
    }

    /**
     * @param  {(error:any,result:any)=>void} callback
     */
    retrieve(callback: (error: any, result: any) => void) {
        this._model.find({}, callback)
    }

    /**
     * @param  {(error:any,result:any)=>void} callback
     */
    paginate(query, selectFields, pageSize: number, pageNumber: number, sortBy: string, callback: (error: any, result: any) => void) {
        const skip = pageNumber && pageNumber > 1 ? (pageNumber - 1) * pageSize : 0;
        if (selectFields) {
            this._model.find(query, callback).sort(sortBy).skip(skip).limit(pageSize).select(selectFields);
        }
        else {
            this._model.find(query, callback).sort(sortBy).skip(skip).limit(pageSize).select(selectFields);
        }
    }


    /**
    * @param  {mongoose.Types.ObjectId} _id
    * @param  {T} item
    * @param  {(error:any,result:any)=>void} callback
    */
    update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, item, callback);

    }

    /**
     * @param  {string} _id
     * @param  {(error:any,result:any)=>void} callback
     */
    delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));

    }

    /**
     * @param  {string} _id
     * @param  {(error:any,result:T)=>void} callback
     */
    findById(_id: string, callback: (error: any, result: T) => void) {
        this._model.findById(_id, callback);
    }

    /**
     * @param  {Object} object
     * @param  {(error:any,result:T)=>void} callback
     * @param  {string} selectFields?
     */
    find(object: {}, callback: (error: any, result: T[]) => void, selectFields?: string) {
        if (selectFields)
            this._model.find(object, callback).select(selectFields);
        else
            this._model.find(object, callback);
    }

    /**
     * @param  {Object} object
     * @param  {(error:any,result:T)=>void} callback
     * @param  {string} selectFields?
     */
    findOne(object: {}, callback: (error: any, result: T[]) => void, selectFields?: string) {
        if (selectFields)
            this._model.findOne(object, callback).select(selectFields);
        else
            this._model.findOne(object, callback);
    }


    /**
     * @param  {string} _id
     */
    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }

}

//export = BaseRepository;