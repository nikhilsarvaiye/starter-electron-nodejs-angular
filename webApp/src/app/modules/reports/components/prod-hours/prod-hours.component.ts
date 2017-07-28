import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { data } from './../../data';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'prod-hours',
  styleUrls: ['./prod-hours.component.scss'],
  templateUrl: './prod-hours.component.html'
})
export class ProdHoursComponent {
  constructor() { 
     this.setOverallProdChart();
  } 
setOverallProdChart(){
this.productivityChart={
  chart:{
    type:'spline',
     spacingBottom: 75,
        spacingTop: 80,
        spacingLeft: 100,
        spacingRight: 100
  },
  title:{text: 'Productive Hours Statistics'},
   xAxis: {
        categories: ['10AM', '11AM', '12PM', '1PM', '2PM', '3PM',
            '4PM', '5PM', '6PM', '7PM']
    },
    yAxis:{
       title: {
            text: 'No. of Employees'
        }
    },
  series: data.ProductivityHoursCount
};
}
productivityChart:Object;
}