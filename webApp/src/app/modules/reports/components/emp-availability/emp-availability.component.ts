import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { data } from './../../data';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'emp-availability',
  styleUrls: ['./emp-availability.component.scss'],
  templateUrl: './emp-availability.component.html'
})
export class EmpAvailabilityComponent {
    empAvailabilityData=data.TodaysAvailabilityStatus;
    chartFilterOptions=[
       {id: 0, name: "Today"},
       {id: 1, name: "This Week"},
       {id: 2, name: "This Year"},
    ];
    selectedfilterValue=0;
    selectedValue = 0; 
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
  }
  setAvailabilityChart() {
this.availabilityChart={
  chart:{
    type:'pie',
     spacingBottom: 75,
        spacingTop: 80,
        spacingLeft: 100,
        spacingRight: 100
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
availabilityChart: Object;
}