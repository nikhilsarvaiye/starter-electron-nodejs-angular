import { Observable } from 'rxjs';
import * as mongoose from 'mongoose';
import * as moment from 'moment';

import { Room } from './room.model';

export interface IMessage {
  room: string;
  created: Date;
  from: string;
  to: string;
  message: string;
  sent: boolean;
  delivered: boolean;
  read: boolean;
  type: string;
}

interface IMessageModel extends IMessage, mongoose.Document {}

const MessageSchema = new mongoose.Schema({
  room: {
    type: String,
    index: true
  },
  type: String,
  created: Date,
  from: String,
  to: String,
  message: String,
  sent: Boolean,
  delivered: Boolean,
  read: Boolean
});

const MessageModel = mongoose.model<IMessageModel>('Message', MessageSchema);

export class Message {
  _id: string;
  room: string;
  type: string;
  created: Date;
  from: string;
  to: string;
  message: string;
  sent: boolean;
  delivered: boolean;
  read: boolean;

  constructor(message: IMessageModel) {
    this._id = message._id;
    this.room = message.room;
    this.type = message.type;
    this.created = moment(message.created).toDate();
    this.from = message.from;
    this.to = message.to;
    this.message = message.message;
    this.sent = message.sent;
    this.delivered = message.delivered;
    this.read = message.read;
  }

  public static create(message: IMessage): Observable<Message> {
    return new Observable(observer => {
      Room.find(message.room).subscribe(
        room => {
          message.created = new Date();
          message.sent = true;
          MessageModel.create(message, (error, message) => {
            if (!error && message) {
              observer.next(new Message(message));
            }
            observer.complete();
          });
         },
         error => observer.error(new Error())
       );
    });
  }

  public static list(room: string): Observable<Message[]> {
    return new Observable(observer => {
      MessageModel.find({ room }, (error, messages) => {
        if (!error && messages) {
          observer.next(messages.map(message => new Message(message)));
        } else {
          observer.next([]);
        }
        observer.complete();
      });
    });
  }

  public static unReadMessageCount(room: string, user: string): Observable<any> {
    return new Observable(observer => {
      MessageModel.count({ room: room, to: user, sent: true, delivered: false }, (error, count: number) => {
        if (!error) {
          observer.next(count);
        } else {
          observer.next([]);
        }
        observer.complete();
      });
    });
  }

  public static remove(room: string): Observable<Message[]> {
    return new Observable(observer => {
      MessageModel.remove({ room }, (error) => {
        if (!error) {
          observer.complete();
        } else {
          observer.error(new Error(error));
        }
      });
    });
  }
}