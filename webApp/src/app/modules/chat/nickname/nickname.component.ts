import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { UserService } from './../../user/user.service';

@Component({
  selector: 'nickname',
  styleUrls: ['./nickname.component.scss'],
  templateUrl: './nickname.component.html'
})

export class NicknameComponent implements AfterViewInit {
  @ViewChild('focus') private focus: ElementRef;
  userId: string;

  constructor(public userService: UserService) {
    
  }

  // After view initialised, focus on userId text input
  ngAfterViewInit(): void {
    this.focus.nativeElement.focus();
  }

  // Save userId to user store
  save(): void {
    
  }

  // Handle keypress event, for saving userId
  eventHandler(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.save();
    }
  }
}
