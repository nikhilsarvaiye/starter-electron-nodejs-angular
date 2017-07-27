import { Room, Message } from '../../models';
import { MessageSocket } from './message';

export class RoomSocket {
  nsp: any;
  name: string;
  data: any;
  socket: any;
  rooms: Room[] = [];
  messageSockets: MessageSocket[] = [];

  constructor(private io: any) {
    this.nsp = this.io.of('/room');
    this.nsp.on('connection', (socket: any) => {
      console.log('Client connected');
      // console.log('Message Sockets', JSON.stringify(this.messageSockets));
      this.socket = socket;
      this.updateMessageSockets();
      this.listen();
    });
  }

  // Add signal
  private listen(): void {
    this.socket.on('disconnect', () => this.disconnect());
    this.socket.on('create', (params: any) => this.create((<any>params).name, (<any>params).title, (<any>params).users, (<any>params).createdBy, (<any>params).isChannel));
    this.socket.on('update', (params: any) => this.update((<any>params)._id, (<any>params).title, (<any>params).users));
    this.socket.on('remove', (params: any) => this.remove((<any>params).name, (<any>params).userId));
    this.socket.on('list', (userId: string) => this.list(userId));
  }

  // Handle disconnect
  private disconnect(): void {
    console.log('Client disconnected');
  }

  // Create a room
  private create(name: string, title: string, users: string[], createdBy: string, isChannel: boolean): void {
    Room.create(name, title, users, createdBy, isChannel).subscribe(
      room => {
        this.rooms.push(room);
        this.updateMessageSockets();
        this.nsp.emit('item', room);
      },
      error => console.error('Room creation failed', error)
    );
  }

  // update a room
  private update(_id: string, title: string, users: string[]): void {
    Room.update(_id, title, users).subscribe(
      room => {
        this.nsp.emit('update-item', room);
      },
      error => console.error('Room creation failed', error)
    );
  }

  // Remove a room
  private remove(name: string, userId: string): void {
    Room.find(name).subscribe(
      room => room.remove().subscribe(x => { }, e => { }, () => this.list(userId)),
      error => console.error('Room removal failed', error)
    );
  }

  // List all rooms
  private list(userId: string): void {
    Room.listByQuery({ 'users': userId }).subscribe(rooms => {
      this.rooms = rooms;
      this.updateMessageSockets();
      this.nsp.emit('items', rooms);
    });
  }

  // Update message sockets
  private updateMessageSockets(): void {
    // Add message sockets for new rooms
    let validRooms = {};
    for (const room of this.rooms) {
      validRooms[room._id] = true;
      const matches = this.messageSockets.filter(messageSocket => messageSocket.room._id === room._id);
      if (matches.length == 0) {
        console.log('creating new namespace for', room.name);
        this.messageSockets.push(new MessageSocket(this.io, room));
      }
    }

    // Destroy sockets for removed rooms
    for (const index in this.messageSockets) {
      const messageSocket = this.messageSockets[index];
      if (!validRooms[messageSocket.room._id]) {
        this.messageSockets.splice(parseInt(index, 10), 1);
      }
    }
  }
}