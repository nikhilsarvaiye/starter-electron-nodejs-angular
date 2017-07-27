import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'policy',
    styleUrls: ['./policy.component.scss'],
    templateUrl: './policy.component.html'
})

export class PolicyComponent implements OnInit {

    @Input() data: any = null;

    @Output() send: EventEmitter<string> = new EventEmitter();

    policies;
    year;

    constructor() { }

    ngOnInit(): void {
        this.policies = this.data.result;
        this.year = new Date().getFullYear();
    }

    sendMessage(message): void {
        if (this.send) {
            this.send.emit(message);
        }
    }
}

