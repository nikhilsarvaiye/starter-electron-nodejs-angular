import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputEmojiDirective, InputFacemocDirective } from './directives/emoji.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

import { ModalComponent } from './services/modal/modal.component';
import { ModalModule } from 'ng2-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule
  ],
  declarations: [
    FilterPipe,
    OrderByPipe,
    InputEmojiDirective,
    InputFacemocDirective,
    ModalComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    OrderByPipe,
    FilterPipe,
    InputEmojiDirective,
    InputFacemocDirective,
    ModalComponent
  ]
})
export class SharedModule {}
