import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { LayoutModule } from './../layout/layout.module';
import { ProfileCardModule } from './../profile-card';
import { ChatModule } from './../chat/chat.module';
import { FeedComponent } from './feed.component';
import { FeedService } from './feed.service';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ChatModule,
    FormsModule,
    ProfileCardModule
  ],
  declarations: [
    FeedComponent
  ],
  providers: [FeedService],
  exports: [
    FeedComponent
  ]
})
export class FeedModule {
}
