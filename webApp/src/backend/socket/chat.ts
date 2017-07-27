import { Room, Message, TimeTracker, TimeTrackerTypes } from '../../models';
import { MessageSocket } from './message';

export class ChatSocket {
  nsp: any;
  client: any;
  users: any[];

  constructor(private io: any) {
    this.nsp = this.io;
    this.io.on('connection', (socket: any) => {

      /* add entry to time tracker */
      TimeTracker.add(socket.request.user.user_id, TimeTrackerTypes.In);

      this.listen(socket);

      console.log(`${socket.request.user.firstname} Client connected`);
      this.io.emit('user-joined', socket.request.user);

    });
  }


  // Add signal
  private listen(socket): void {
    socket.on('disconnect', () => this.disconnect(socket));
    socket.on('list', () => this.list());
  }

  // Handle disconnect
  private disconnect(socket): void {
    console.log(`${socket.request.user.firstname} Client disconnected`);
    /* add entry to time tracker */
    TimeTracker.add(socket.request.user.user_id, TimeTrackerTypes.Out);
    this.io.emit('user-left', socket.request.user);
  }

  // List all rooms
  private list(): void {
    this.nsp.emit('items', this.users);
  }

  private addUser(user): void {
    this.users = this.users || [];
    if (!this.users.find(x => x.user_id)) {
      this.users.push(user);
    }
  }

  private removeUser(user): void {
    const presentUser = this.users.find(x => x.user_id);
    if (presentUser) {
      this.users.splice(this.users.indexOf(presentUser), 1);
    }
  }
}