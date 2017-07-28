import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IUserModel } from './../user/user.model';
import { UserService } from './../user/user.service';
import { DomController } from './../../shared/controllers/dom/dom-controller';

@Component({
    selector: 'feed',
    styleUrls: ['./feed.component.scss'],
    templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {

    private user: IUserModel;
    
    constructor(private userService: UserService) {
        this.user = userService.getUserDetails();
    }
    
    public ngOnInit() {
        console.log('hello `Feed` component');
    }

    ngAfterViewInit() {
        // DomController.profileCardLoaded();
    }
}

