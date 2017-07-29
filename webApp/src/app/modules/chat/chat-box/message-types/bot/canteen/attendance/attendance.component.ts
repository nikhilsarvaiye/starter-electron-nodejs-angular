import { UserService } from './../../../../../../user/user.service';
import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AttendanceService } from "./attendance.service";
import { IUserModel } from "../../../../../../user/user.model";
import * as _ from 'lodash';

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'attendance',
    styleUrls: ['./attendance.component.scss'],
    templateUrl: './attendance.component.html',
    providers: [AttendanceService]
})

export class AttendanceComponent implements OnInit {

    @Input() data: any = null;

    @Output() send: EventEmitter<string> = new EventEmitter();

    attendance;
    year;
    actionResponse;
    showAlert: boolean = false;
    private user: IUserModel;

    constructor(private attendanceService: AttendanceService, public userService: UserService) {
        this.user = userService.getUserDetails();
    }

    ngOnInit(): void {
        //this.attendance = this.data ? this.data.result : [];
        this.attendance = [{
            EmployeeId: 'OCSP272',
            EmployeeName: 'Nikhil Sarvaiye',
            Date: new Date(),
            TimeIn: new Date(),
            TimeOut: new Date(),
            DiscrepencyType: 'LateIn',
            DiscrepencyDescription: 'You are late by 1 hour',
        },
        {
            EmployeeId: 'OCSP272',
            EmployeeName: 'Nikhil Sarvaiye',
            Date: new Date(),
            TimeIn: new Date(),
            TimeOut: new Date(),
            DiscrepencyType: 'EarlyOut',
            DiscrepencyDescription: 'You left early by 2 hour 40 minutes',
        },
        {
            EmployeeId: 'OCSP272',
            EmployeeName: 'Nikhil Sarvaiye',
            Date: new Date(),
            TimeIn: new Date(),
            TimeOut: new Date(),
            DiscrepencyType: 'HalfDay',
            DiscrepencyDescription: 'Due minimum half day hours not completed',
        }];

        // get regularization
        // const req = JSON.stringify({
        //     "UserId": "user1@nitorinfotech.com",
        //     "IsMobileRequest": "true",
        //     "FilterCriteria": {
        //         "PageIndex": 1,
        //         "PageSize": 10,
        //         "SortAsc": false,
        //         "SortBy": "Created",
        //         "Filters": [],
        //         "FilterValues": {
        //             "dashboard": "MyDiscrepancies",
        //             "tab": "MyDiscrepancies"
        //         }
        //     }
        // });
        // this.attendanceService.getAttendanceForRegularization(req).then(d => {
        //     console.log(d);
        // });

        this.year = new Date().getFullYear();
    }

    submitDiscripancies(): void {
        const discripancies: any = _.filter(this.attendance, { 'selected': true });
        setTimeout(d => {
            if (discripancies.length) {
                this.actionResponse = 'Your response is successfully submitted.';
                this.attendance = [];
            } else {
                this.showAlert = false;
                this.actionResponse = 'Please select item to mark your discripancies.';
            }
        }, 1);
    };

    sendMessage(message): void {
        if (this.send) {
            this.send.emit(message);
        }
    }
}

