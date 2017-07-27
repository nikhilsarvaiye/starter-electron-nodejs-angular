import { Injectable } from '@angular/core';
import {
    Http,
    ConnectionBackend,
    RequestOptions,
    RequestOptionsArgs,
    Request,
    Response,
    Headers,
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import 'rxjs/Rx';

@Injectable()
export class HttpInterceptor extends Http {

    private router: Router;
    private authService: AuthService;

    constructor(backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        router: Router,
        authService: AuthService) {
        super(backend, defaultOptions);
        this.router = router;
        this.authService = authService;
    }

    /**
     * Performs any type of http request.
     * @param url
     * @param options
     * @returns {Observable<Response>}
     */
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    /**
     * Performs a request with `get` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        this.requestInterceptor();
        return super.get(this.getFullUrl(url), this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                this.onSubscribeError(error);
            })
            .finally(() => {
                this.onFinally();
            });
    }

    getLocal(url: string, options?: RequestOptionsArgs): Observable<any> {
        return super.get(url, options);
    }

    /**
     * Performs a request with `post` http method.
     * @param url
     * @param body
     * @param options
     * @returns {Observable<>}
     */
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        this.requestInterceptor();
        return super.post(this.getFullUrl(url), body, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                this.onSubscribeError(error);
            })
            .finally(() => {
                this.onFinally();
            });
    }

    /**
     * Performs a request with `put` http method.
     * @param url
     * @param body
     * @param options
     * @returns {Observable<>}
     */
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
        this.requestInterceptor();
        return super.put(this.getFullUrl(url), body, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                this.onSubscribeError(error);
            })
            .finally(() => {
                this.onFinally();
            });
    }

    /**
     * Performs a request with `delete` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        this.requestInterceptor();
        return super.delete(this.getFullUrl(url), options)
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                this.onSubscribeError(error);
            })
            .finally(() => {
                this.onFinally();
            });
    }


    /**
     * Request options.
     * @param options
     * @returns {RequestOptionsArgs}
     */
    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }

        if (!(<any>options.headers)._headers.has(this.authService.headerKey)) {
            options.headers.append(this.authService.headerKey, this.authService.getToken());
        }
        return options;
    }

    /**
     * Build API url.
     * @param url
     * @returns {string}
     */
    private getFullUrl(url: string): string {
        // return full URL to API here
        return url;
    }

    /**
     * Request interceptor.
     */
    private requestInterceptor(): void {
        //this.loaderService.showPreloader();
    }

    /**
     * Response interceptor.
     */
    private responseInterceptor(): void {
        //this.loaderService.hidePreloader();
    }

    /**
     * Error handler.
     * @param error
     * @param caught
     * @returns {ErrorObservable}
     */
    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }

    /**
     * onSubscribeSuccess
     * @param res
     */
    private onSubscribeSuccess(res: Response): void {
    }

    /**
     * onSubscribeError
     * @param error
     */
    private onSubscribeError(error: any): void {
        if (error.status === 401) {
            if (error && error.json() && error.json().error && error.json().error.message == "jwt expired") {
                //"Previously valid authentication has expired. Please Login Again"
                // Logout and Redirect to login route
                this.authService.logout();
            }
            // Redirect to login route
            this.router.navigate([this.authService.loginRoute]);
        }
    }

    /**
     * onFinally
     */
    private onFinally(): void {
        this.responseInterceptor();
    }
}