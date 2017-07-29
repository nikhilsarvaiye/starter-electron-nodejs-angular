import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./../../shared";
import { ProfileCardModule } from './../profile-card/profile-card.module';
import { LayoutModule } from './../layout/layout.module';
import { ChartModule } from 'angular2-highcharts';
import { AuthService } from './../../core/service/auth.service';
import { ReportsService } from './reports.service';
import { ReportsComponent } from './reports.component';
import { SentimentAnalysisComponent } from './components/sentiment-analysis/sentiment-analysis.component';
import { ProdHoursComponent } from './components/prod-hours/prod-hours.component';
import { EmpAllocationComponent } from './components/emp-allocation/emp-allocation.component';
import { EmpAvailabilityComponent } from './components/emp-availability/emp-availability.component';

import { data } from '../data';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LayoutModule,
    ProfileCardModule,
    ChartModule.forRoot(require('highcharts'))
  ],
  declarations: [
    ReportsComponent,
    SentimentAnalysisComponent,
    ProdHoursComponent,
    EmpAllocationComponent,
    EmpAvailabilityComponent
  ],
  providers: [AuthService, ReportsService],
  exports: [
    
  ]
})
export class ReportsModule {
}
