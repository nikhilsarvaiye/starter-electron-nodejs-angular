/**
 * Created by Neeraj
 */
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { AuthService } from './../../core/service/auth.service'
import { PromiseErrorHandler } from './../../core/error/error.handler'

@Injectable()
export class ReportsService {

    private headers;
    private requestOptions;

    constructor(private http: Http, private router: Router, private authService: AuthService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json')
        this.requestOptions = new RequestOptions({ headers: this.headers });
    }
}