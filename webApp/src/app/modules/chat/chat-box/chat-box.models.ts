import { IMessage, IRoom } from '../../../../models';

export class UserRoom {
  public status: string;
  public rooms: Array<IRoom>;

  constructor(status: string, rooms: Array<IRoom>) {
    this.status = status;
    this.rooms = rooms;
  }
}

export class ChatConversation {
  public day: string;
  public messages: Array<IMessage>;

  constructor(day: string, messages: Array<IMessage>) {
    this.day = day;
    this.messages = messages;
  }
}