import { ReplaySubject } from 'rxjs';
import * as moment from 'moment';

import { SocketService } from '../../shared/services/socket.service';
import { MomentDays } from '../../shared/helpers/moment.days';
import { UserService } from '../user/user.service';
import { IMessage } from '../../../models';
import { ChatConversation } from './chat-box/chat-box.models';

export class MessageService {
  messages: ReplaySubject<any> = new ReplaySubject(1);
  private list: IMessage[] = [];
  private socketService: SocketService;

  constructor(private userService: UserService, private room: string) {
    // Connect to room nsp
    this.socketService = new SocketService('messages/' + encodeURIComponent(this.room));

    // get all stored previous messages
    this.socketService.list();

    // Get initial items
    this.socketService.items()
      .map(messages => (messages || []).forEach(x => this.list.push(x)))
      .subscribe(
      messages => {
        this.continous();
        this.messages.next(this.list);
      },
      error => console.log(error)
      );

    // Send user joined message
    this.socketService.onConnect().subscribe(
      x => { },
      e => { },
      () => {
        // this.send(`${this.userService.userDetails.user_id} joined the channel`);
      }
    );

    // Send user leave message
    this.socketService.onDisconnect().subscribe(
      x => { },
      e => { },
      () => {
        // this.send(`${this.userService.userDetails.user_id} left the channel`)
      }
    );
  }

  continous(): void {
    // Get continous items
    this.socketService.item()
      .subscribe(
      message => {
        const alreadyPresent = this.list.find(x => (<any>x)._id == message._id);
        if (!alreadyPresent) {
          this.list.push(message);
        }
        this.messages.next(this.list);
      },
      error => console.log(error)
      );
  }

  // Emit message using socket service
  send(message: string, type?: string): void {
    type = type || '';
    this.socketService.create({
      room: this.room,
      created: new Date(),
      from: this.userService.userDetails.user_id,
      to: '',
      message: message,
      type: type
    });
  }

  // group messages
  group(messages: Array<IMessage>): Array<ChatConversation> {
    const chatConversations = new Array<ChatConversation>();
    const momentDays = new MomentDays(moment());
    chatConversations.push({
      day: 'Older',
      messages: messages.filter(x => momentDays.isTwoWeeksOrMore(moment(x.created.toString())))
    });
    chatConversations.push({
      day: 'This week',
      messages: messages.filter(x => momentDays.isWithinAWeek(moment(x.created.toString())))
    });
    chatConversations.push({
      day: 'Yesterday',
      messages: messages.filter(x => momentDays.isYesterday(moment(x.created.toString())))
    });
    chatConversations.push({
      day: 'Today',
      messages: messages.filter(x => momentDays.isToday(moment(x.created.toString())))
    });

    return chatConversations
  }

  /// todo: test
  join(): void {
    // this.socketService.socket.join();
  }

  leave(): void {
    this.socketService.socket.disconnect();
  }

}
