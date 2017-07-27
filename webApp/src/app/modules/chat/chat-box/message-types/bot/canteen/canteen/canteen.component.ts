import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'canteen',
    styleUrls: ['./canteen.component.scss'],
    templateUrl: './canteen.component.html'
})

export class CanteenComponent implements OnInit {

    @Input() data: any = null;

    @Output() send: EventEmitter<string> = new EventEmitter();

    menu;

    constructor() { }

    ngOnInit(): void {
        this.menu = this.data;
    }

    sendMessage(message): void {
        if (this.send) {
            this.send.emit(message);
        }
    }
}

