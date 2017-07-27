import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "./../../shared";
import { ChatModule } from './../chat/chat.module';
import { ProfileCardModule } from './../profile-card/profile-card.module';

import { AuthService } from './../../core/service/auth.service';
import { HeaderComponent } from './header';
import { SideNavComponent } from './side-nav';
import { QuickLaunchAppsComponent } from './quick-launch-apps';
import { BrandHeaderComponent } from './brand-header';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ChatModule,
    ProfileCardModule
  ],
  declarations: [
    HeaderComponent, SideNavComponent, QuickLaunchAppsComponent, BrandHeaderComponent
  ],
  providers: [AuthService],
  exports: [
    HeaderComponent, SideNavComponent, QuickLaunchAppsComponent, BrandHeaderComponent
  ]
})
export class LayoutModule {
}
