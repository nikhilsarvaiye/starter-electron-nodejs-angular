import { Message } from './../../../../../../../models/message.model';
import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from './../../../../../user/user.service';
import { IUserModel } from './../../../../../../modules/user/user.model';

@Component({
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'canteen-bot-message',
  styleUrls: ['./canteen-bot.message.component.scss'],
  templateUrl: './canteen-bot.message.component.html'
})

export class CanteenBotMessageComponent implements OnInit {

  @Input() message: any;

  @Output() send: EventEmitter<string> = new EventEmitter();

  private user: IUserModel;

  data;
  botType;

  constructor(private userService: UserService) {
    this.user = userService.getUserDetails();
  }

  ngOnInit(): void {
    this.message = this.isJsonString(this.message.message) ? JSON.parse(this.message.message) : '';
    if (this.message) {
      setTimeout((d) => {
        this.data = this.message;
        this.botType = this.message.botType;
      }, 1);
    }
  }

  isJsonString(str) : boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  sendMessage(message): void {
    if (this.send) {
      this.send.emit(message);
    }
  }
}

