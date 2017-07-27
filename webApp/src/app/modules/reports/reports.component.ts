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
    empAvailabilityData=data.TodaysAvailabilityStatus;
    chartFilterOptions=[
       {id: 0, name: "Today"},
       {id: 1, name: "This Week"},
       {id: 2, name: "This Year"},
    ];
    selectedfilterValue=0;
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
onOptionChange(value){
   if(value==0)
    this.empAvailabilityData=data.TodaysAvailabilityStatus;
     if(value==1)
    this.empAvailabilityData=data.ThisWeekAvailabilityStatus;
    else
    this.empAvailabilityData=data.ThisMonthAvailabilityStatus;
    this.setAvailabilityChart();
    this.selectedfilterValue=value;
}
  constructor() { 
    this.setAvailabilityChart();
    this.setSentimentAnalysisChart();
     this.setEmployeeAllocationChart();
     this.setOverallProdChart();
  }

  setAvailabilityChart() {
this.availabilityChart={
  chart:{
    type:'pie'
  },
  title:{text: 'Availability Statistics of Employees '},
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
  series: this.empAvailabilityData
};
}
setOverallProdChart(){
this.productivityChart={
  chart:{
    type:'spline'
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
setSentimentAnalysisChart() {
    this.sentimentStats = {
      chart: {
        type: 'column'
      },
      title: { text: 'Sentiment Analysis Statistics' },
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
      series: data.SentimentAnalysisStats
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
sentimentStats: Object;
employeeAllocationChart:Object;
productivityChart:Object;
sentimentAnalysisStats=Object;
  onChatRoomSelect(event): void { 
  }
  ngAfterViewInit() {
    DomController.updateReports();
  }
}