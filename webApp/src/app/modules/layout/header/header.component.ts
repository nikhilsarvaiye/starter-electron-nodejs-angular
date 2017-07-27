import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomController } from './../../../shared/controllers/dom/dom-controller';
import { AuthService } from './../../../core/service/auth.service';
import { IUserModel } from './../../../modules/user/user.model';
import { UserService } from './../../user/user.service';

@Component({
  selector: 'header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  private user: IUserModel;
  
  public ngOnInit() {
    console.log('hello `Top Nav` component');
  }

  constructor(private authService: AuthService, private userService: UserService) {
    this.user = userService.getUserDetails();
  }

  public logout(){
    this.authService.logout();
  }

  ngAfterViewInit() {
    DomController.updateTopNav();
  }
}
