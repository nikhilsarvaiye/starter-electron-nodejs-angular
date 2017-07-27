import * as express from "express";
import { ApiRequest } from './../../../../core/api/request.api';
import { ApiResponse } from './../../../../core/api/response.api';
import { AppError } from './../../../../core/error/error.handler';
import { Logger } from './../../../../core/logger/logger';
import { PolicyService } from './policy.service';
import { IPolicyModel } from "./models/policy.model";

export class PolicyApi {

    static createItem(req: express.Request, res: express.Response, next): void {
        let correlationId = ApiRequest.CorrelationId.new();
        try {
            var item = <IPolicyModel>req.body;
            new PolicyService().createItem(item, function (error: any, result: any) {
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
            var item = <IPolicyModel>req.body;
            new PolicyService().updateItem(item._id, item, function (error: any, result: any) {
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
            var item = <IPolicyModel>req.body;
            new PolicyService().deleteItem(item._id, function (error: any, result: any) {
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
            new PolicyService().paginateItems(parseInt(body.pageSize), parseInt(body.pageNumber), function (error: any, result: any) {
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
            new PolicyService().search(req.query, function (error: any, result: any) {
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

Object.seal(PolicyApi);
