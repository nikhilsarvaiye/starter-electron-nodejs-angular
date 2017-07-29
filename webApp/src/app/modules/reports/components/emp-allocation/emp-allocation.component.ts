import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { data } from './../../data';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'emp-allocation',
  styleUrls: ['./emp-allocation.component.scss'],
  templateUrl: './emp-allocation.component.html'
})
export class EmpAllocationComponent {
  empAllocationData = data.AllCount;
   departments= [
      {id: 0, name: "All"},
       {id: 1, name: "Developement"},
       {id: 2, name: "Testing"},
       {id: 3, name: "BI"}
      ];
    selectedValue = 0;
    onChange(newValue) {
    if(newValue==0)
    this.empAllocationData=data.AllCount;
    if(newValue==1)
    this.empAllocationData=data.DevlopmentCount;
     else if(newValue==2)
    this.empAllocationData=data.TestingCount;
     else 
     this.empAllocationData=data.BI;
    this.setEmployeeAllocationChart();
    this.selectedValue = newValue;
}
  constructor() { 
     this.setEmployeeAllocationChart();
  }
  setEmployeeAllocationChart() {
    this.employeeAllocationChart = {
      chart: {
        type: 'column',
         spacingBottom: 75,
        spacingTop: 80,
        spacingLeft: 100,
        spacingRight: 100
      },
       title: { text: ' Filtered Employee Allocation' },
       yAxis: {
         
        title: {
          text: 'No. of Employee Allocated'
        }
      },
       plotOptions: {
            column: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true
                },
                showInLegend: true
            }
        },
      series: this.empAllocationData
    };
  }
employeeAllocationChart:Object;
}