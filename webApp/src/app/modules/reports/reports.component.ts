import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IRoom } from '../../../models';
import { DomController } from './../../shared/controllers/dom/dom-controller';
import { data } from '../data';

//import { AdminService } from './modules/admin/admin.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'reports',
  styleUrls: ['./reports.component.scss'],
  templateUrl: './reports.component.html'
})

export class ReportsComponent {
  selectedChart = 1;
  changeSelectedChart(value) {
    this.selectedChart = value;
  }

  ngAfterViewInit() {
    DomController.updateReports();
  }

}