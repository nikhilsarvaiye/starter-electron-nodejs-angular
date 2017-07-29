import { IMessage, Message, Room } from "../../models";
import { MessageReplyHelper } from './../modules/message-reply/message-reply.helper';

export class MessageSocket {
  nsp: any;
  data: any;
  socket: any;

  constructor(io: any, public room: Room) {
    this.nsp = io.of("/messages/" + encodeURIComponent(this.room.name));
    this.nsp.on("connection", (socket: any) => {
      console.log("Client connected to room:", this.room.name);
      this.socket = socket;
      this.listen();
    });
  }

  private Connect(): void {

  }

  // Add signal
  private listen(): void {
    this.socket.on("disconnect", () => this.disconnect());
    this.socket.on("create", message => this.create(message));
    this.socket.on("list", () => this.list());
    this.socket.on("unread-count", (user) => this.listUnreadCount(user));
  }

  // Handle disconnect
  private disconnect(): void {
    console.log("Client disconnected from room:", this.room.name);
  }

  // Create a message in a room
  private create(params: IMessage): void {
    params.room = this.room.name;
    Message.create(params).subscribe(
      message => {
        this.nsp.emit('item', message);

        // create auto message reply is it is bot
        if (MessageReplyHelper.isBot(params)) {
          MessageReplyHelper.getMessageReply(params, (replyMessage: IMessage) => {
            Message.create(replyMessage).subscribe(
              message => {
                this.nsp.emit('item', message)
              },
              error => console.error('Message sending failed', error)
            );
          });
        }
      },
      error => console.error('Message sending failed', error)
    );
  }

  // Create a message in a room
  private createBotReply(params: IMessage, callback: () => void): void {
    // required
    params.room = this.room.name;

    // update
    params.from = 'CanteenBot';

    // todo: call to api.ai
    // get the response based on meeage and return the result
    // params.message = response;
    params.message = "This is canteen bot";

    Message.create(params).subscribe(
      message => {
        this.nsp.emit('item', message)
      },
      error => console.error('Message sending failed', error)
    );
  }

  // List all messages in a room
  private list(): void {
    this.room.messages()
      .map(messages => messages.reverse())
      .subscribe(messages => {
        messages.map(message => this.socket.emit(message));
        this.nsp.emit('items', messages);
      });
  }

  // List all messages in a room
  private listUnreadCount(user: string): void {
    this.room.unReadMessageCount(user)
      .subscribe(count => {
        this.nsp.emit('unread-count', count);
      });
  }

}