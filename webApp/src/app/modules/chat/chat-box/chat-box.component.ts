import { Component, ViewEncapsulation, Input, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import { UserService } from './../../user/user.service';
import { NotificationService } from './../../../core';
import { RoomService } from './../room.service';
import { IMessage, IRoom } from '../../../../models';
import { MessageService } from './../message.service';
import { ChatConversation } from './chat-box.models';
import { MessageTypes, MessageTypeHelper } from './message-types';
import { IUserModel } from './../../../modules/user/user.model';
import { DomController } from './../../../shared/controllers/dom/dom-controller';
import { ChatDomController } from './controllers/chat-dom.controller';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'chat-box',
  styleUrls: ['./chat-box.component.scss'],
  templateUrl: './chat-box.component.html'
})

export class ChatBoxComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scroll') private scroll: ElementRef;
  @ViewChild('focus') private focus: ElementRef;
  @ViewChild('inputsend') private inputSend: ElementRef;

  @Input() room: IRoom;
  @Input() render: boolean;

  private user: IUserModel;
  private chatWindow = {
    title: '',
    status: '',
    about: 'the best view comes after the hardest climb',
    user: null,
    members: []
  }
  message: string = '';
  messages: IMessage[];
  chatConversations: ChatConversation[];

  private messageService: MessageService;
  private alreadyLeftChannel: boolean = false;

  constructor(private roomService: RoomService, public userService: UserService, private readonly _notificationService: NotificationService) {
    this.user = userService.getUserDetails();
  }

  // Handle keypress event, for saving nickname
  ngOnInit(): void {
    if (this.room) {

      if (!this.room.isChannel) {
        // set user
        this.setChatUser();
      }
      else {
        // set user
        this.setChatChannel();
      }

      this.messageService = new MessageService(this.userService, this.room.name);
      this.messageService.messages.subscribe(messages => {
        this.messages = messages;
        this.chatConversations = this.messageService.group(messages)
        setTimeout(() => {
          this.scrollToBottom();
        }, 200);
      });
    }
  }

  // After view initialized, focus on chat message text input
  ngAfterViewInit(): void {
    if (this.focus) {
      this.focus.nativeElement.focus();
    }
    DomController.scrollChatContent();

    if (this.inputSend) {
      ChatDomController.applyEmoji(this.inputSend.nativeElement, this.eventHandler);
      // ChatDomController.applyFaceMocion(this.inputSend.nativeElement);
    }
  }

  // When component is destroyed, ensure that leave message is sent
  ngOnDestroy(): void {
    if (!this.alreadyLeftChannel) {
      this.leave();
    }
  }

  private setChatUser(): void {
    // set chat user
    const chatUserId = (this.room.users || []).find(x => x != this.user.user_id);
    this.userService.getUserbyUserId(chatUserId).subscribe(user => {
      this.chatWindow.user = user;
      this.chatWindow.title = (<any>this.chatWindow.user).name;
      // this.chatWindow.about = '';
    });
  }

  private setChatChannel(): void {
    // this.chatWindow.user = this.room.title;
    this.chatWindow.title = this.room.title;
    this.chatWindow.about = '';
    // set chat users
    (this.room.users).forEach(chatUserId => {
      this.userService.getUserbyUserId(chatUserId).subscribe(user => {
        this.chatWindow.members.push(user);
      });
    });
  }

  // Send chat message, and reset message text input
  send(): void {
    // get message type
    const messageType = MessageTypeHelper.getMessageTypeByRoom(this.room);
    this.messageService.send(this.message, messageType);
    this.message = '';
    this.scrollToBottom();
  }

  sendBotMessage(message): void {
    this.message = message;
    this.send();
  }

  // Leave room gracefully
  leave(): void {
    this.alreadyLeftChannel = true;
    this.messageService.leave();
    this.roomService.leave(this.room.name);
  }

  //* Scroll to bottom (this is called when new message is received)
  scrollToBottom(): void {
    DomController.scrollChatContentBottom();
  }

  // Handle keypress event, for sending chat message
  eventHandler(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.send();
    }
  }
}

