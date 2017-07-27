export { AppError, HandleError, HandleErrorResponse, HandleErrorTypes } from './../../../common/core/error/error.handler'

export class PromiseErrorHandler {

    public static handleError(error: any): Promise<any> {
        //Observable.throw(error.json().error || 'Server error');
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}