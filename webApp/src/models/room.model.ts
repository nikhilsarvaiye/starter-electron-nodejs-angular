import { Observable } from 'rxjs';
import * as mongoose from 'mongoose';
import * as moment from 'moment';

import { IMessage, Message } from './message.model';

export interface IRoom {
  name: string;
  title: string;
  isChannel: boolean;
  created: Date;
  modified: Date;
  online: boolean;
  status: string;
  users: string[];
  createdBy: string;
}

interface IRoomModel extends IRoom, mongoose.Document { }

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  title: String,
  created: Date,
  modified: Date,
  users: [String],
  createdBy: String,
  isChannel: Boolean
});

const RoomModel = mongoose.model<IRoomModel>('Room', RoomSchema);

export class Room {
  _id: string;
  title: string;
  name: string;
  created: Date;
  modified: Date;
  users: string[];
  createdBy: string;
  isChannel: boolean;

  constructor(room: IRoomModel) {
    this._id = room._id;
    this.name = room.name;
    this.title = room.title;
    this.created = moment(room.created).toDate();
    this.modified = moment(room.modified).toDate();
    this.users = room.users;
    this.createdBy = room.createdBy;
    this.isChannel = room.isChannel;
  }

  public static find(name: string): Observable<Room> {
    return new Observable(observer => {
      RoomModel.findOne({ name }, (error, room) => {
        if (!error && room) {
          observer.next(new Room(room));
        }
        observer.complete();
      });
    });
  }

  public static create(name: string, title: string, users: string[], createdBy: string, isChannel: boolean): Observable<Room> {
    return new Observable(observer => {
      const created = new Date();
      RoomModel.create({ name, title, created, users, createdBy, isChannel }, (error, room) => {
        if (!error && room) {
          observer.next(new Room(room));
          observer.complete();
        } else {
          observer.error(new Error());
        }
      });
    });
  }

  public static update(_id: string, title: string, users: string[]): Observable<Room> {
    return new Observable(observer => {
      const modified = new Date();
      RoomModel.findOneAndUpdate({ _id: _id }, { title, users, modified }, { new: true }, (error, room) => {
        if (!error && room) {
          observer.next(new Room(room));
          observer.complete();
        } else {
          observer.error(new Error());
        }
      });
    });
  }

  public static updateModified(_id: string): Observable<Room> {
    return new Observable(observer => {
      const modified = new Date();
      RoomModel.findOneAndUpdate({ _id: _id }, { modified }, { new: true }, (error, room) => {
        if (!error && room) {
          observer.next(new Room(room));
          observer.complete();
        } else {
          observer.error(new Error());
        }
      });
    });
  }

  public static list(): Observable<Room[]> {
    return new Observable(observer => {
      RoomModel.find({}, (error, rooms) => {
        if (!error && rooms) {
          observer.next(rooms.map(room => new Room(room)));
        } else {
          observer.next([]);
        }
        observer.complete();
      });
    });
  }

  public static listByQuery(query): Observable<Room[]> {
    return new Observable(observer => {
      RoomModel.find(query, (error, rooms) => {
        if (!error && rooms) {
          observer.next(rooms.map(room => new Room(room)));
        } else {
          observer.next([]);
        }
        observer.complete();
      });
    });
  }

  remove(): Observable<any> {
    return new Observable(observer => {
      RoomModel.remove({ name: this.name }).exec();
      Message.remove(this.name).subscribe(
        x => { },
        error => observer.error(new Error(error)),
        () => observer.complete()
      );
    });
  }

  messages() {
    return Message.list(this.name);
  }

  unReadMessageCount(user) {
    return Message.unReadMessageCount(this.name, user);
  }


}