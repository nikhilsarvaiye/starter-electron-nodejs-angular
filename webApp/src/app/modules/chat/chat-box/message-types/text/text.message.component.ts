import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { UserService } from './../../../../user/user.service';
import { IUserModel } from './../../../../../modules/user/user.model';

@Component({
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'text-message',
  styleUrls: ['./text.message.component.scss'],
  templateUrl: './text.message.component.html'
})

export class TextMessageComponent implements OnInit {

  @Input() message: any;
  
  private user: IUserModel;

  constructor(private userService: UserService) {
    this.user = userService.getUserDetails();
  }

  ngOnInit(): void {
    
  }
}

