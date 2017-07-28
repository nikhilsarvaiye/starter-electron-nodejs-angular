import * as express from "express";
import * as jwt from 'jsonwebtoken';
import * as mongoose from "mongoose";
import { ApiRequest } from './../../../../core/api/request.api'
import { ApiResponse } from './../../../../core/api/response.api'
import { PasswordAuth } from './../../../../core/auth/password.auth'
import { AppError, HandleError, HandleErrorResponse, HandleErrorTypes } from './../../../../core/error/error.handler'
import { Logger } from './../../../../core/logger/logger'
import { BaseService } from './../../../../core/service/base.service'
import { BaseRepository } from './../../../../core/repository/base.repository'
import { CanteenConstants } from "./canteen.constants";
import { ICanteenItemModel, CanteenItemSchema, ICanteenMenuItemModel, CanteenMenuItemSchema, ICanteenOrderModel, CanteenOrderSchema } from "./models";
// import { UserValidation } from "./models/user.model.validation";
import { Mail, MailOptions } from './../../../../core/mail/mail.sender';

export class CanteenService extends BaseService<ICanteenItemModel> {

    constructor() {
        super(CanteenItemSchema);
    }

    /**
     * @param  {ICanteenItemModel} item
     * @param  {(error:any,result:any)=>void} callback
     */
    createItem(item: ICanteenItemModel, callback: (error: any, result: any) => void) {
        this.repository.create(item, callback);
    }

    /**
     * @param  {string} _id
     * @param  {ICanteenItemModel} item
     * @param  {(error:any,result:any)=>void} callback
     */
    updateItem(_id: string, item: ICanteenItemModel, callback: (error: any, result: any) => void) {
        this.repository.update(mongoose.Types.ObjectId(_id), item, callback);
    }

    /**
     * @param  {string} _id
     * @param  {(error:any,result:any)=>void} callback
     */
    deleteItem(_id: string, callback: (error: any, result: any) => void) {
        this.repository.delete(_id, callback);
    }

    /**
     * @param  {string} selectFields
     * @param  {number} pageSize
     * @param  {number} pageNumber
     * @param  {(error:any,result:any)=>void} callback
     */
    paginateItems(pageSize: number, pageNumber: number, callback: (error: any, result: any) => void) {
        const sortBy = CanteenConstants.Schemas.Items.Fields.title;
        this.repository.paginate({}, null, pageSize, pageNumber, sortBy, callback);
    }


    /**
     * @param  {ICanteenMenuItemModel} menuItem
     * @param  {(error:any,result:any)=>void} callback
     */
    createMenuItem(menuItem: ICanteenMenuItemModel, callback: (error: any, result: any) => void) {
        const menuRepository: BaseRepository<ICanteenMenuItemModel> = new BaseRepository(CanteenMenuItemSchema);
        menuRepository.create(menuItem, callback);
    }

    /**
     * @param  {string} _id
     * @param  {ICanteenMenuItemModel} menuItem
     * @param  {(error:any,result:any)=>void} callback
     */
    updateMenuItem(_id: string, menuItem: ICanteenMenuItemModel, callback: (error: any, result: any) => void) {
        const menuRepository: BaseRepository<ICanteenMenuItemModel> = new BaseRepository(CanteenMenuItemSchema);
        menuRepository.update(mongoose.Types.ObjectId(_id), menuItem, callback);
    }

    /**
     * @param  {string} _id
     * @param  {(error:any,result:any)=>void} callback
     */
    deleteMenuItem(_id: string, callback: (error: any, result: any) => void) {
        const menuRepository: BaseRepository<ICanteenMenuItemModel> = new BaseRepository(CanteenMenuItemSchema);
        menuRepository.delete(_id, callback);
    }

    /**
     * @param  {string} selectFields
     * @param  {number} pageSize
     * @param  {number} pageNumber
     * @param  {(error:any,result:any)=>void} callback
     */
    paginateMenuItems(pageSize: number, pageNumber: number, callback: (error: any, result: any) => void) {
        const sortBy = CanteenConstants.Schemas.MenuItems.Fields.item;
        const menuRepository: BaseRepository<ICanteenMenuItemModel> = new BaseRepository(CanteenMenuItemSchema);
        menuRepository.paginate({}, null, pageSize, pageNumber, sortBy, callback);
    }

    /**
     * @param  {ICanteenOrderModel} order
     * @param  {(error:any,result:any)=>void} callback
     */
    placeOrder(order: ICanteenOrderModel, callback: (error: any, result: any) => void) {
        const orderRepository: BaseRepository<ICanteenOrderModel> = new BaseRepository(CanteenOrderSchema);
        orderRepository.create(order, callback);
    }

    /**
     * @param  {string} _id
     * @param  {ICanteenOrderModel} order
     * @param  {(error:any,result:any)=>void} callback
     */
    updateOrder(_id: string, order: ICanteenOrderModel, callback: (error: any, result: any) => void) {
        const orderRepository: BaseRepository<ICanteenOrderModel> = new BaseRepository(CanteenOrderSchema);
        orderRepository.update(mongoose.Types.ObjectId(_id), order, callback);
    }

    /**
     * @param  {string} _id
     * @param  {(error:any,result:any)=>void} callback
     */
    deleteOrder(_id: string, callback: (error: any, result: any) => void) {
        const orderRepository: BaseRepository<ICanteenOrderModel> = new BaseRepository(CanteenOrderSchema);
        orderRepository.delete(_id, callback);
    }

    /**
     * @param  {string} selectFields
     * @param  {number} pageSize
     * @param  {number} pageNumber
     * @param  {(error:any,result:any)=>void} callback
     */
    paginateOrders(pageSize: number, pageNumber: number, callback: (error: any, result: any) => void) {
        const sortBy = CanteenConstants.Schemas.Orders.Fields.created;
        const orderRepository: BaseRepository<ICanteenOrderModel> = new BaseRepository(CanteenOrderSchema);
        orderRepository.paginate({}, null, pageSize, pageNumber, sortBy, callback);
    }

    /**
    * @param {string} key
    * @param {(error:any,result:any)=>void} callback
    */
    search(key: string, callback: (error: any, result: any) => void) {
        const selectFields = '';
        this.repository.find({
            $or: [
                { title: { "$regex": key, "$options": "i" } },
                { price: { "$regex": key, "$options": "i" } },
                { type: { "$regex": key, "$options": "i" } }
            ]
        }, callback);
    }

}

Object.seal(CanteenService);
