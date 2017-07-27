import { Component, OnInit, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { IUserModel } from './../user/user.model';
import { UserService } from './../user/user.service';
import { DomController } from './../../shared/controllers/dom/dom-controller';

@Component({
    selector: 'profile-card',
    styleUrls: ['./profile-card.component.scss'],
    templateUrl: './profile-card.component.html'
})
export class ProfileCardComponent implements OnInit {

    private user: IUserModel;
    
    @Output()
    newChannel: EventEmitter<any> = new EventEmitter();
  
    constructor(private userService: UserService) {
        this.user = userService.getUserDetails();
    }

    public ngOnInit() {
        console.log('hello `Profile Card` component');
    }

    ngAfterViewInit() {
        DomController.profileCardLoaded();
    }

    createNewChannel(): void {
        if(this.newChannel) {
            this.newChannel.emit(null);
        }
    }
}

