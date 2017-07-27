import { Observable } from 'rxjs';
import * as mongoose from 'mongoose';

export interface ITimeTracker {
  user: string;
  created: Date;
  trackerDateTime: Date;
  type: string;
}

interface ITimeTrackerModel extends ITimeTracker, mongoose.Document { }

export const TimeTrackerTypes = {
  LogIn: 'LogIn',
  In: 'In',
  Out: 'Out',
  LogOut: 'LogOut',
};

const TimeTrackerSchema = new mongoose.Schema({
  user: {
    type: String,
    index: true
  },
  created: Date,
  trackerDateTime: Date,
  type: String
});

const TimeTrackerModel = mongoose.model<ITimeTrackerModel>('TimeTracker', TimeTrackerSchema);

export class TimeTracker {

  constructor() {
  }

  public static add(user: string, trackerType: string): void {
    console.log(`adding new entry to time tracker for user ${user} and trackerType ${trackerType}`);
    let timeTracker = <ITimeTrackerModel>{};
    timeTracker.user = user;
    timeTracker.type = trackerType;
    timeTracker.created = new Date();
    timeTracker.trackerDateTime = new Date();

    TimeTrackerModel.create(timeTracker, (error, response) => {
      if (!error && response) {

      }
    });
  }
}