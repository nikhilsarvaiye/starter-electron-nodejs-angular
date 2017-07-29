/**
 * Created by NikhilS
 */
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { PromiseErrorHandler } from './../../../../../../../core/error/error.handler'
import { ICanteenOrderModel } from './../../../../../../../../backend/modules/message-reply/bot/canteen/models/canteen.order.model';
import { AuthService } from "../../../../../../../core/index";

@Injectable()
export class CanteenService {

  private headers;
  private requestOptions;

  orderDetails: ICanteenOrderModel;

  constructor(private http: Http, private router: Router, private authService: AuthService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers = this.authService.getAuthHeaders(this.headers);
    this.requestOptions = new RequestOptions({ headers: this.headers });
  }

  public placeOrder(order: ICanteenOrderModel): Promise<any> {
    return this.http
      .post('/order/place', order, this.headers)
      .toPromise()
      .then((res: Response) => {
        return res.json();
      })
      .catch(PromiseErrorHandler.handleError);
  }
}