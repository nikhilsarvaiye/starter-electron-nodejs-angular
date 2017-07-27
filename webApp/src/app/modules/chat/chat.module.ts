import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "./../../shared";
import { MessageTypesModule } from "./chat-box/message-types";

// Other components
import { ChatListComponent } from './chat-list';
import { ChatBoxComponent } from './chat-box';

import { ChatService } from './chat.service';
import { RoomService } from './room.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MessageTypesModule
  ],
  declarations: [
    ChatListComponent,
    ChatBoxComponent
  ],
  providers: [ChatService, RoomService],
  exports: [
    ChatListComponent, ChatBoxComponent
  ]
})
export class ChatModule {
}
