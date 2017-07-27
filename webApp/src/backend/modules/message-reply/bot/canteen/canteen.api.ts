import * as express from "express";
import { ApiRequest } from './../../../../core/api/request.api';
import { ApiResponse } from './../../../../core/api/response.api';
import { AppError } from './../../../../core/error/error.handler';
import { Logger } from './../../../../core/logger/logger'
import { ICanteenItemModel, ICanteenMenuItemModel, ICanteenOrderModel } from './models';
import { CanteenService } from './canteen.service';

export class CanteenApi {

    static createItem(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var item = <ICanteenItemModel>req.body;
            new CanteenService().createItem(item, function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }

    static updateItem(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var item = <ICanteenItemModel>req.body;
            new CanteenService().updateItem(item._id, item, function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }

    static deleteItem(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var item = <ICanteenItemModel>req.body;
            new CanteenService().deleteItem(item._id, function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }
    
    static paginateItems(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var body = req.query;
            new CanteenService().paginateItems(parseInt(body.pageSize), parseInt(body.pageNumber), function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }

    /* menu */

    static createMenuItem(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var item = <ICanteenMenuItemModel>req.body;
            new CanteenService().createMenuItem(item, function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }

    static updateMenuItem(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var item = <ICanteenMenuItemModel>req.body;
            new CanteenService().updateMenuItem(item._id, item, function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }

    static deleteMenuItem(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var item = <ICanteenMenuItemModel>req.body;
            new CanteenService().deleteMenuItem(item._id, function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }
    
    static paginateMenuItems(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var body = req.query;
            new CanteenService().paginateMenuItems(parseInt(body.pageSize), parseInt(body.pageNumber), function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }

    /* order */
    
    static placeOrder(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var item = <ICanteenOrderModel>req.body;
            new CanteenService().placeOrder(item, function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }

    static updateOrder(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var item = <ICanteenOrderModel>req.body;
            new CanteenService().updateOrder(item._id, item, function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }

    static deleteOrder(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var item = <ICanteenOrderModel>req.body;
            new CanteenService().deleteOrder(item._id, function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }
    
    static paginateOrders(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var body = req.query;
            new CanteenService().paginateOrders(parseInt(body.pageSize), parseInt(body.pageNumber), function (error: any, result: any) {
                console.log(error);
                if (error) return next(error);
                res.status(200).send(new ApiResponse(correlationId, result));
            });
        }
        catch (e) {
            Logger.handleExceptions(e);
            res.status(500).send(new ApiResponse((<any>res).correlationId, e));
        }
    }
}

Object.seal(CanteenApi);
