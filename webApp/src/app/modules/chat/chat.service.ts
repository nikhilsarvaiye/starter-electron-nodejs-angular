import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { List } from 'immutable';

import { SocketService } from '../../shared/services/socket.service';
import { UserService } from '../user/user.service';
import { IRoom } from '../../../models';

@Injectable()
export class ChatService {

    private users: ReplaySubject<any> = new ReplaySubject(1);
    public socketService: SocketService;

    rooms: ReplaySubject<any> = new ReplaySubject(1);

    constructor(private userService: UserService) {
        // Open room socket
        this.socketService = new SocketService('');
    }

    public getJoinedUser(callback: (user: any) =>  void) {
        // listen to joined user
        this.socketService.onUserJoin().subscribe((user) => {
            callback(user);
        },
            e => { }
        );
    }

    public onLeftUser(callback: (user: any) =>  void) {
        // listen to left user 
        this.socketService.onUserLeft().subscribe((user) => {
            callback(user);
        },
            e => { }
        );
    }

}