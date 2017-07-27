import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'holiday',
    styleUrls: ['./holiday.component.scss'],
    templateUrl: './holiday.component.html'
})

export class HolidayComponent implements OnInit {

    @Input() data: any = null;

    @Output() send: EventEmitter<string> = new EventEmitter();

    holidays;
    year;

    constructor() { }

    ngOnInit(): void {
        this.holidays = this.data.result;
        this.year = new Date().getFullYear();
    }

    sendMessage(message): void {
        if (this.send) {
            this.send.emit(message);
        }
    }
}

