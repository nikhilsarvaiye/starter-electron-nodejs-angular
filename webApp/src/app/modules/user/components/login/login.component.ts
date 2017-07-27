import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DomController } from './../../../../shared/controllers/dom/dom-controller';
import { UserService } from './../../user.service'
import { IUserModel } from './../../user.model';
import { ModalComponent } from './../../../../shared/services/modal/modal.component';
import { AdalAuthService } from './../../../../core';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {
  
  // ViewChild takes a class type or a reference name string.
  // Here we are using the type
  @ViewChild(ModalComponent) modal: ModalComponent;
  user: IUserModel = <IUserModel>{};
  
  constructor(private _userService: UserService, private _adalAuthService: AdalAuthService){

  }

  public ngOnInit() {
    console.log('hello `login` component');
  }

  public login(){
    this._userService.authenticate(this.user);
  }

  public azureLogin(){
    this._adalAuthService.login();
  }

  ngAfterViewInit(){
    DomController.updateLogin();
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }
}
