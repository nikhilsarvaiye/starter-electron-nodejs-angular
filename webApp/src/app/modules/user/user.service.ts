/**
 * Created by NikhilS
 */
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { AuthService } from './../../core/service/auth.service'
import { PromiseErrorHandler } from './../../core/error/error.handler'
import { IUserModel } from './user.model'
import { IRoom } from '../../../models';
import { AdalAuthService } from './../../core';

@Injectable()
export class UserService {

    private headers;
    private requestOptions;

    userDetails: IUserModel;
    rooms: IRoom[] = [];

    constructor(private http: Http, private router: Router, private authService: AuthService, private _adalAuthService: AdalAuthService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers = this.authService.getAuthHeaders(this.headers);
        this.requestOptions = new RequestOptions({ headers: this.headers });
    }

    authenticate(user: IUserModel): Promise<IUserModel[]> {
        return this.http
            .post('/auth/login', user, this.headers)
            .toPromise()
            .then((res: Response) => {
                let response = res.json();
                if (!response.result.errors) {
                    if (this.authService.setToken(response.result)) {
                        // set user details
                        this.authService.setUserDetails(response.result);
                        this.userDetails = this.getUserDetails();
                        this.router.navigate(['']);
                    }
                }
                return response.result;
            })
            .catch(PromiseErrorHandler.handleError);
    }

    register(user: IUserModel): Promise<any> {
        return this.http
            .post('/auth/register', user, this.headers)
            .toPromise()
            .then((res: Response) => {
                return res.json();
            })
            .catch(PromiseErrorHandler.handleError);
    }

    getUserbyUserId(userId: string): Observable<IUserModel> {
        return new Observable(observer => {
            this.http.get(`/api/user/userId?userId=${userId}`, this.headers)
                .subscribe((res: Response) => {
                    observer.next(res.json().result || [])
                }, (error) => {
                    PromiseErrorHandler.handleError(error);
                });
        });
    }
    
    paginateUsers(pageSize: number, pageNumber: number): Observable<IUserModel[]> {
        return new Observable(observer => {
            this.http.get(`/api/user/paginate?pageSize=${pageSize}&pageNumber=${pageNumber}`, this.headers)
                .subscribe((res: Response) => {
                    observer.next(res.json().result || [])
                }, (error) => {
                    PromiseErrorHandler.handleError(error);
                });
        });
    }

    searchUsers(key): Promise<any> {
        return this.http.get(`/api/user/search?key=${key}`, this.headers)
            .toPromise()
            .then((res: Response) => {
                return res.json();
            })
            .catch(PromiseErrorHandler.handleError);
    }

    logOut(): Promise<any> {
        return new Promise<any>(x => {
            this.authService.removeToken();
            this.router.navigate([this.authService.loginRoute]);
        })
    }

    getUserDetails(): IUserModel {
        let user = this.authService.getUserDetails();
        user = this.getUserName(user);
        return user;
    }

    getUserName(user: IUserModel): IUserModel {
        user.firstname = user.firstname || '';
        user.lastname = user.lastname || '';
        (<any>user).name = `${user.firstname} ${user.lastname}`;
        return user;
    }
}