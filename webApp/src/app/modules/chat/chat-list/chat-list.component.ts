import { Component, AfterContentInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

import { UserService } from './../../user/user.service';
import { NotificationService } from './../../../core';
import { ChatService } from './../chat.service';
import { RoomService } from './../room.service';
import { IUserModel } from '../../../../backend/modules/user/models/user.model';
import { IRoom } from '../../../../models';
import { IChat } from './chat-list.model';
import { DomController } from './../../../shared/controllers/dom/dom-controller';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'chat-list',
  styleUrls: ['./chat-list.component.scss'],
  templateUrl: './chat-list.component.html'
})

export class ChatListComponent {

  @Output()
  select: EventEmitter<IChat[]> = new EventEmitter();


  chats: IChat[] = [];
  userRooms: IRoom[] = [];
  users: IUserModel[];
  room: string = '';
  newRoom: string = '';

  searchText: string;
  filterText: string;
  pageNumber: number;
  pageSize: number;


  constructor(public userService: UserService, public chatService: ChatService, public roomService: RoomService, private readonly _notificationService: NotificationService) {
    this.userService.userDetails = this.userService.getUserDetails();
    // subscribe
    this.init();
    this.onRoomCreation();
    this.onJoinedUser();
    this.onLeftUser();
  }

  // After view initialized, focus on chat message text input
  ngAfterViewInit(): void {
    DomController.scrollChatList();
  }

  init(): void {
    Observable.zip(this.getUsers(), this.roomService.onUserRooms()).subscribe((results) => {
      if (results && results.length > 1) {
        this.setChats(results[0], results[1]);
      }
    });

  }

  // get all limited users
  getUsers(): Observable<IUserModel[]> {
    this.pageNumber = this.pageNumber ? this.pageNumber : 0;
    this.pageSize = this.pageSize || 100;
    return this.userService.paginateUsers(this.pageSize, ++this.pageNumber)
  }

  setChats(users: IUserModel[], rooms: IRoom[], selectRoom?: IRoom): void {
    debugger
    // remove current user from the users
    users = users.filter(x => x.user_id != this.userService.userDetails.user_id);

    // update users with rooms
    users.forEach((x) => {
      const userRoom = rooms.find(y => (y.users || []).indexOf(x.user_id) > -1);
      if (userRoom) {
        (<any>x).room = userRoom;
      }
      (<any>x).pic = this.getContactPic(x);
    });

    // map and add channel rooms to chat
    this.chats = rooms.map(x => {
      let chat = <IChat>x;
      if (x.isChannel) {
        chat.chatName = x.title;
        // todo: set pic
        chat.pic = this.getChannelPic(x);
      } else {
        if (x.users && x.users.length == 2) {
          const chatOtherUserId = x.users.find(x => x != this.userService.userDetails.user_id);
          const roomUser = users.find(u => u.user_id == chatOtherUserId);
          if (roomUser) {
            chat.chatName = roomUser.name;
            // todo: set pic
            chat.pic = this.getContactPic(roomUser);
          }
        }
      }
      return chat;
    });

    // update chats with 
    this.users = users;
    this.userRooms = rooms;

    // select chat
    if (selectRoom) {
      const chat = this.chats.find(x => x._id === (<any>selectRoom)._id);
      if (chat) {
        this.setShowChatBox(chat);
        this.select.emit(this.chats);
      }
    }
  }

  // search user by input
  searchUsers(): void {
    this.userService.searchUsers(this.searchText).then((response) => {
      if (response.result) {
        //to-do:
      }
    });
  }

  // Join room, when Join-button is pressed
  join(roomName): void {
    this.roomService.join(roomName);
    // this.room = '';
  }

  // Remove room, when Remove-button is pressed and unset selected room
  remove(roomName): void {
    this.roomService.remove(roomName);
  }

  createNewChannel() {
    const channelName = this.getRandomChannelName(this.userService.userDetails);
    this.roomService.create(
      channelName,
      [this.userService.userDetails.user_id],
      this.userService.userDetails.user_id, true);
  }

  onContactClick(user: IUserModel): void {
    // find this user in chats if not add
    const chatUser = this.chats.filter(x => !x.isChannel).find(x => x.users.indexOf(user.user_id) > 0);
    if (chatUser) {
      this.setShowChatBox(chatUser);
      this.select.emit(this.chats);
    }
    else {
      this.roomService.create(this.getRoomNameByUsers(this.userService.userDetails, user),
        [this.userService.userDetails.user_id, user.user_id],
        this.userService.userDetails.user_id);
    }
  }

  onChatClick(chat: IChat): void {
    this.setShowChatBox(chat);
    this.select.emit(this.chats);
  }

  onRoomCreation(): void {
    this.roomService.onCreateRoom().subscribe(userRoom => {
      // check if this room belongs to current user or not
      if (userRoom.users.find(x => x === this.userService.userDetails.user_id)) {
        // add this room to rooms
        this.userRooms.push(userRoom);
        // re build user chats
        this.setChats(this.users, this.userRooms, userRoom);
      }
    });
  }

  onJoinedUser() {
    this.chatService.getJoinedUser((user) => {
      this.setChatAvailabilityStatus(user, true);
    });
  }

  onLeftUser() {
    this.chatService.onLeftUser((user) => {
      this.setChatAvailabilityStatus(user, false);
    });
  }

  private setChatAvailabilityStatus(user: any, isOnline: boolean) {
    const chat = (this.chats || []).find(x => x.users && x.users.length > 1 && x.users[1] == user.user_id);
    if (chat) {
      chat.isOnline = isOnline;
      // add notifications
      if (isOnline) {
        this.notifyUserIsOnline(chat.user);
      }
    }
    const contactUser = (this.users || []).find(x => x.user_id == user.user_id);
    if (contactUser) {
      contactUser.isOnline = isOnline;
      // add notifications
      if (isOnline) {
        this.notifyUserIsOnline(contactUser);
      }
      // update user status on db
    }
  }

  private notifyUserIsOnline(user: IUserModel) {
    if (user) {
      this._notificationService.notify(`Employee ${user.name} Online`, '', '');
    }
  }

  private setShowChatBox(chat: IChat): void {
    this.chats.forEach(x => {
      x.showChatBox = false;
    });
    this.chats.filter(x => x._id == chat._id).forEach(x => {
      x.showChatBox = true;
    });
  }

  private getRoomNameByUsers(loggedInUser: IUserModel, withUser: IUserModel) {
    return `${loggedInUser.user_id}_${loggedInUser.firstname}__${withUser.user_id}_${withUser.firstname}`;
  }

  private getRandomChannelName(loggedInUser: IUserModel) {
    return `${loggedInUser.user_id}_${(Math.random() + 987632)}`;
  }

  private getContactPic(user: IUserModel) {
    return (<any>user).pic ? (<any>user).pic : '/assets/images/avatar.jpg';
  }

  private getChannelPic(room: IRoom) {
    return (<any>room).pic ? (<any>room).pic : '/assets/images/avatar.jpg';
  }
}
