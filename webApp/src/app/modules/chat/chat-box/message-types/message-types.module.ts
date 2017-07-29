import { CanteenComponent } from './bot/canteen/canteen/canteen.component';
import { PolicyComponent } from './bot/canteen/policy/policy.component';
import { HolidayComponent } from './bot/canteen/holiday/holiday.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Other components
import { TextMessageComponent } from './text';
import { CanteenBotMessageComponent } from './bot/canteen';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TextMessageComponent,
    HolidayComponent,
    PolicyComponent,
    CanteenComponent,
    CanteenBotMessageComponent
  ],
  providers: [],
  exports: [
    TextMessageComponent,
    HolidayComponent,
    PolicyComponent,
    CanteenComponent,
    CanteenBotMessageComponent
  ]
})
export class MessageTypesModule {
}
