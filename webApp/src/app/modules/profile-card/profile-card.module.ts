import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProfileCardComponent } from './profile-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProfileCardComponent
  ],
  providers: [],
  exports: [
    ProfileCardComponent
  ]
})
export class ProfileCardModule {
}
