import { AttendanceComponent } from './bot/canteen/attendance/attendance.component';
import { CanteenComponent } from './bot/canteen/canteen/canteen.component';
import { PolicyComponent } from './bot/canteen/policy/policy.component';
import { HolidayComponent } from './bot/canteen/holiday/holiday.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Other components
import { TextMessageComponent } from './text';
import { CanteenBotMessageComponent } from './bot/canteen';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TextMessageComponent,
    HolidayComponent,
    PolicyComponent,
    CanteenComponent,
    AttendanceComponent,
    CanteenBotMessageComponent
  ],
  providers: [],
  exports: [
    TextMessageComponent,
    HolidayComponent,
    PolicyComponent,
    CanteenComponent,
    AttendanceComponent,
    CanteenBotMessageComponent
  ]
})
export class MessageTypesModule {
}
