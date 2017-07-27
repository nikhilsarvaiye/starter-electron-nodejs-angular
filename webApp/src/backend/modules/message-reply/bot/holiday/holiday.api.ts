import * as express from "express";
import { ApiRequest } from './../../../../core/api/request.api';
import { ApiResponse } from './../../../../core/api/response.api';
import { AppError } from './../../../../core/error/error.handler';
import { Logger } from './../../../../core/logger/logger';
import { HolidayService } from './holiday.service';
import { IHolidayModel } from "./models/holiday.model";

export class HolidayApi {

    static createItem(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var item = <IHolidayModel>req.body;
            new HolidayService().createItem(item, function (error: any, result: any) {
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
            var item = <IHolidayModel>req.body;
            new HolidayService().updateItem(item._id, item, function (error: any, result: any) {
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
            var item = <IHolidayModel>req.body;
            new HolidayService().deleteItem(item._id, function (error: any, result: any) {
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
            new HolidayService().paginateItems(parseInt(body.pageSize), parseInt(body.pageNumber), function (error: any, result: any) {
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

    static searchItems(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            new HolidayService().search(req.query, function (error: any, result: any) {
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

Object.seal(HolidayApi);
