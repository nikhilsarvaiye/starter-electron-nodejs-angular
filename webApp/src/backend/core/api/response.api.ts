import { AppError } from './../error/error.handler';
// class MetaData{
//     public uri: string;
//     public type: string;
//     public etag: string;
// }

// class Result {
//     public __metadata: MetaData;
//     public results: any[];
//     public __count: any;
// }

export class ApiResponse {
    public correlationId: string;
    public error: AppError;
    public result: any;

    constructor(_correlationId: string, result?: any, error?: AppError) {
        this.correlationId = _correlationId;
        this.result = result;
        if (error)
            this.error = error;
    }
}
