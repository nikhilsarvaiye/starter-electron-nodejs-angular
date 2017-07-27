import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IUserModel } from './../user/user.model';
import { UserService } from './../user/user.service';
import { DomController } from './../../shared/controllers/dom/dom-controller';

@Component({
    selector: 'profile',
    styleUrls: ['./profile.component.scss'],
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    private user: IUserModel;
    
    constructor(private userService: UserService) {
        this.user = userService.getUserDetails();
    }
    
    public ngOnInit() {
        console.log('hello `Profile Card` component');
    }

    ngAfterViewInit() {
        // DomController.profileCardLoaded();
    }
}

