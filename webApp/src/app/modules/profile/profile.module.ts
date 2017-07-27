import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { LayoutModule } from './../layout/layout.module';
import { ProfileCardModule } from './../profile-card';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ProfileCardModule
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule {
}
