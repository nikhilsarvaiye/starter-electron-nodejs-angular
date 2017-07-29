/**
 * Created by NikhilS
 */
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { PromiseErrorHandler } from './../../../../../../../core/error/error.handler';
import { AuthService } from "../../../../../../../core/index";

@Injectable()
export class AttendanceService {

  private headers;
  private requestOptions;

  constructor(private http: Http, private authService: AuthService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers = this.authService.getAuthHeaders(this.headers);
    this.requestOptions = new RequestOptions({ headers: this.headers });
  }

  public getAttendanceForRegularization(model): Promise<any> {
    return this.http
      .get('http://trial3.nitovate.net/api/Common/Get/EmployeesByEmailfromMongo/dXNlcjFAbml0b3JpbmZvdGVjaC5jb20=') // , this.headers
      .toPromise()
      .then((res: Response) => {
        return res.json();
      })
      .catch(PromiseErrorHandler.handleError);
  }
}