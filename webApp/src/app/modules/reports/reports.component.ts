import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { IRoom } from '../../../models';
import { DomController } from './../../shared/controllers/dom/dom-controller';
import { data } from '../data';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'reports',
  styleUrls: ['./reports.component.scss'],
  templateUrl: './reports.component.html'
})

export class ReportsComponent {
  empAllocationData = data.AllCount;
   departments= [
      {id: 0, name: "All"},
       {id: 1, name: "Developement"},
       {id: 2, name: "Testing"},
       {id: 3, name: "BI"}
      ];
    selectedValue = 0;
    onChange(newValue) {
    console.log(newValue);
    if(newValue==0)
    this.empAllocationData=data.AllCount;
    if(newValue==1)
    this.empAllocationData=data.DevlopmentCount;
     else if(newValue==2)
    this.empAllocationData=data.TestingCount;
     else 
     this.empAllocationData=data.BI;
    this.setEmployeeAllocationChart();
   console.log(this.employeeAllocationChart["series"]);
   

    this.selectedValue = newValue;
}
  constructor() { 
    this.setAvailabilityChart();
     this.setCurrentStatusChart();
     this.setEmployeeAllocationChart();
  }
  setAvailabilityChart() {
this.availabilityChart={
  chart:{
    type:'pie'
  },
  title:{text: 'Employee Statistics in Percentage'},
  plotOptions:{
           pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true
                },
                showInLegend: true
           }
  },
  series: data.AvailabilityStatus
};
}
setCurrentStatusChart() {
    this.currentStatusChart = {
      chart: {
        type: 'column'
      },
      title: { text: 'Current Employee Status :' },
       yAxis: {
         
        title: {
          text: 'No. of Employees'
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
      series: data.CurrentEmployeeStatus
    };
  }

  setEmployeeAllocationChart() {
    this.employeeAllocationChart = {
      chart: {
        type: 'column'
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
availabilityChart: Object;
currentStatusChart: Object;
employeeAllocationChart:Object;
  onChatRoomSelect(event): void { 
  }
  ngAfterViewInit() {
    DomController.updateReports();
  }
}