import { Component } from '@angular/core';

import { UserService } from './../../user/user.service';
import { IRoom } from '../../../../models';

@Component({
  selector: 'rooms',
  styleUrls: ['./rooms.component.scss'],
  templateUrl: './rooms.component.html'
})

export class RoomsComponent {
  constructor(public userService: UserService) {
  }
}
