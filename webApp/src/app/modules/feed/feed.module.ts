import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { LayoutModule } from './../layout/layout.module';
import { ProfileCardModule } from './../profile-card';
import { ChatModule } from './../chat/chat.module';
import { FeedComponent } from './feed.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ChatModule,
    ProfileCardModule
  ],
  declarations: [
    FeedComponent
  ],
  providers: [],
  exports: [
    FeedComponent
  ]
})
export class FeedModule {
}
