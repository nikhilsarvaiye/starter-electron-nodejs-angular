import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'canteen',
  styleUrls: ['./canteen.component.scss'],
  templateUrl: './canteen.component.html'
})

export class CanteenComponent implements OnInit {

  @Input() data: any = null;

  @Output() send: EventEmitter<string> = new EventEmitter();

  menuItems;
  actionResponse;
  showAlert;

  constructor() { }

  ngOnInit(): void {
    console.log("I am in Canteen Component : " + this.data.result.result.action);
    var items = [
      /* 1 */
      {
        "_id": "597ad0c872bc8f17085bd887",
        "title": "Poha",
        "price": 20,
        "type": "breakfast"
      },

      /* 2 */
      {
        "_id": "597ad16172bc8f17085bd888",
        "title": "Upma",
        "price": 10,
        "type": "breakfast"
      },

      /* 3 */
      {
        "_id": "597ad17072bc8f17085bd889",
        "title": "Missal Pav",
        "price": 30,
        "type": "breakfast"
      },

      /* 4 */
      {
        "_id": "597ad17e72bc8f17085bd88a",
        "title": "Vada Pav",
        "price": 15,
        "type": "breakfast"
      },

      /* 5 */
      {
        "_id": "597ad19172bc8f17085bd88b",
        "title": "Banana Shake",
        "price": 30,
        "type": "Snacks"
      },

      /* 6 */
      {
        "_id": "597ad1af72bc8f17085bd88c",
        "title": "Thali",
        "price": 50,
        "type": "Lunch"
      },

      /* 7 */
      {
        "_id": "597ad1cb72bc8f17085bd88d",
        "title": "Biryani",
        "price": 100,
        "type": "Lunch"
      }
    ];
    this.menuItems = _.map(items || this.data.result, o => _.extend({ quantity: 1 }, o));
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
      this.actionResponse = JSON.stringify(_.filter(this.menuItems, { 'selected': true }));
      this.menuItems = [];
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

