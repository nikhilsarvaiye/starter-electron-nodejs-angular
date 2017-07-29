import { UserService } from './../../../../../../user/user.service';
import { CanteenService } from './canteen.service';
import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { IUserModel } from "../../../../../../user/user.model";

@Component({
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'canteen',
  styleUrls: ['./canteen.component.scss'],
  templateUrl: './canteen.component.html',
  providers: [CanteenService]
})

export class CanteenComponent implements OnInit {

  @Input() data: any = null;

  @Output() send: EventEmitter<string> = new EventEmitter();

  menuItems;
  actionResponse;
  showAlert;
  private user: IUserModel;

  constructor(private _canteenService: CanteenService, public userService: UserService) {
    this.user = userService.getUserDetails();
  }

  ngOnInit(): void {
    this.menuItems = _.map(this.data.result, o => _.extend({ quantity: 1 }, o));
  }

  getTotalBill(): number {
    let sum: number = 0;
    _.each(this.menuItems, (d) => {
      sum += d.selected ? (d.quantity * d.price) : 0;
    });
    return sum;
  }

  placeOrder(): void {
    const order: any = _.filter(this.menuItems, { 'selected': true });
    if (order.length) {
      let canteenOrderModel: any = [];
      order.map(d => {
        canteenOrderModel.push({
          menuItem: d.title,
          menuItemId: d._id,
          quantity: d.quantity,
          userId: this.user._id,
          created: new Date()
        });
      });
      this._canteenService.placeOrder(canteenOrderModel).then(d => {
        this.actionResponse = "Your order is successfully placed.";
        this.menuItems = [];
      });
    } else {
      this.actionResponse = 'Please select item to place order.';
    }
  }

  sendMessage(message): void {
    if (this.send) {
      this.send.emit(message);
    }
  }
}

