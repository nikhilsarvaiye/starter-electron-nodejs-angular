import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "./../../shared";
import { ChatModule } from './../chat/chat.module';
import { LayoutModule } from './../layout/layout.module';
import { ProfileCardModule } from './../profile-card/profile-card.module';

import { AuthService } from './../../core/service/auth.service';
import { ContentService } from './content.service';
import { ContentComponent } from './content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ChatModule,
    LayoutModule,
    ProfileCardModule
  ],
  declarations: [
    ContentComponent
  ],
  providers: [AuthService],
  exports: [
    
  ]
})
export class ContentModule {
}
