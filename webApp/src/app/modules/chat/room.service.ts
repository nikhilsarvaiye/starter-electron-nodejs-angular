import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { List } from 'immutable';

import { SocketService } from '../../shared/services/socket.service';
import { UserService } from '../user/user.service';
import { IRoom } from '../../../models';

@Injectable()
export class RoomService {
  rooms: ReplaySubject<any> = new ReplaySubject(1);
  private list: IRoom[] = [];
  private socketService: SocketService;

  constructor(private userService: UserService) {
    // Open room socket
    this.socketService = new SocketService('room');

    // Subscribe to room list updates
    const user = this.userService.getUserDetails();
    // Get initial list
    this.socketService.getUserRooms(user.user_id);
  }

  onUserRooms(): Observable<IRoom[]> {
    return this.socketService.items();
  }

  onCreateRoom(): Observable<IRoom> {
    return this.socketService.item();
  }

  onUpdateRoom(): Observable<IRoom> {
    return this.socketService.updateItem();
  }

  // Join room
  join(name: string): void {
    const matches = this.list.filter(room => room.name === name);
    const alreadyJoined = this.userService.rooms.filter(room => room.name === name);
    if (matches[0] && !alreadyJoined[0]) {
      this.userService.rooms.push(matches[0]);
    }
  }

  // Leave room
  leave(name: string) {
    this.userService.rooms = this.userService.rooms.filter(room => room.name !== name);
  }

  // Create room
  create(name: string, users: string[], createdBy: string, isChannel?: boolean) {
    this.socketService.create({
      name: name,
      users: users,
      title: 'Channel ' + users.join(', '),
      createdBy: createdBy,
      isChannel: isChannel
    });
  }

  update(_id: string, title: string, users: string[]) {
    this.socketService.update({
      _id: _id,
      title: title,
      users: users
    });
  }

  // Remove room
  remove(name: string) {
    // Leave room
    this.leave(name);

    // Send signal to remove the room
    this.socketService.remove(name);
  }
}