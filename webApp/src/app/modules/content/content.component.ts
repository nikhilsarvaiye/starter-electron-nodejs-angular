import { Component, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

import { IRoom } from '../../../models';
import { ChatListComponent } from './../chat/chat-list/chat-list.component';
import { IChat } from './../chat/chat-list/chat-list.model';
import { IUserModel } from '../../../backend/modules/user/models/user.model';
import { DomController } from './../../shared/controllers/dom/dom-controller';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'content',
  styleUrls: ['./content.component.scss'],
  templateUrl: './content.component.html'
})

export class ContentComponent {
  
  @ViewChild('chatListComponent')
  chatListComponent: ChatListComponent;
  
  chats: IChat[];

  constructor() { }
  
  onNewChannel(): void {
    this.chatListComponent.createNewChannel();
  }
  
  onChatRoomSelect(chats: IChat[]): void {
    this.chats = chats;
  }

  ngAfterViewInit() {
    DomController.updateContent();
  }
}