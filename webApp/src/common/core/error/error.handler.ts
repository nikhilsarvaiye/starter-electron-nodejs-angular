/**
 * A custom AppError class
 * @class
 */
/**
 * OData V4
// {
//   "error": {
//     "code": "501",
//     "message": "Unsupported functionality",
//     "target": "query",
//     "details": [
//       {
//        "code": "301",
//        "target": "$search", 
//        "message": "$search query option not supported"
//       }
//     ],
//     "innererror": {
//       "trace": [...],
//       "context": {...}
//     }
//   }
// }
*/
// extends Error 
export class AppError {
    /**
     * Constructs the AppError class
     * @param {String} message an error message
     * @constructor
     */
    public code: string;
    
    public message: string;
    public stack: any;

    constructor(message, code?, stack?) {
        // super(message);
        // properly capture stack trace in Node.js
        Error.captureStackTrace(this, this.constructor);
        //this.name = this.constructor.name;
        this.message = message;
        this.code = code || 500;
        this.stack = stack;
    }
}


export class HandleErrorTypes {
    public static VALIDATION: string = "validation";
    public static DATABASE: string = "database";
}

export class HandleError {
    public message: string;
    public type: string;
    constructor(message: string, type?: string) {
        this.message = message;
        this.type = type || HandleErrorTypes.VALIDATION;
    }
}

export class HandleErrorResponse {
    public errors: Array<HandleError>;
    constructor(errors: HandleError | Array<HandleError>) {
        if(errors instanceof HandleError)
            this.errors = [errors];
        else 
            this.errors = errors;
    }
}