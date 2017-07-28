import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { IRoom } from '../../../models';
import { DomController } from './../../shared/controllers/dom/dom-controller';
import { data } from '../data';
declare var $:JQueryStatic;
//import { AdminService } from './modules/admin/admin.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'reports',
  styleUrls: ['./reports.component.scss'],
  templateUrl: './reports.component.html'
})

export class ReportsComponent {
  selectedChart=1;
  $('a').click(function(){
      $(this).addClass("visited");
});
  changeSelectedChart(value){
    this.selectedChart=value;
  }
}