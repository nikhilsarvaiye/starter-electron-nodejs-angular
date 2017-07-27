import * as moment from 'moment';

export class MomentDays {

    private reference: moment.Moment;

    constructor(reference: moment.Moment) {
        this.reference = reference;
    }

    public isToday(momentDate) {
        const TODAY = this.reference.clone().startOf('day');
        return momentDate.isSame(TODAY, 'd');;
    }

    public isYesterday(momentDate) {
        const YESTERDAY = this.reference.clone().subtract(1, 'days').startOf('day');
        return momentDate.isSame(YESTERDAY, 'd');;
    }

    public isWithinAWeek(momentDate) {
        const A_WEEK_OLD = this.reference.clone().subtract(7, 'days').startOf('day');
        return momentDate.isSame(A_WEEK_OLD, 'd');;
    }

    public isTwoWeeksOrMore(momentDate) {
        var A_WEEK_OLD = this.reference.clone().subtract(7, 'days').startOf('day');
        return momentDate.isSame(A_WEEK_OLD, 'd');;
    }

}