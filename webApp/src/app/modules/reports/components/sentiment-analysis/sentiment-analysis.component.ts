import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { data } from './../../data';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'sentiment-analysis',
  styleUrls: ['./sentiment-analysis.component.scss'],
  templateUrl: './sentiment-analysis.component.html'
})
export class SentimentAnalysisComponent {
  constructor() { 
    this.setSentimentAnalysisChart();
  }
setSentimentAnalysisChart() {
    this.sentimentStats = {
      chart: {
        type: 'column',
       spacingBottom: 75,
        spacingTop: 80,
        spacingLeft: 100,
        spacingRight: 100
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
sentimentStats: Object;
}