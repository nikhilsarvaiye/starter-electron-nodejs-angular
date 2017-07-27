import { Component, ViewEncapsulation } from '@angular/core';
import { NotificationService } from './core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})

export class AppComponent {

  constructor(private readonly _notificationService: NotificationService) {
    
    // _notificationService.notify('Test Message');
  }

}