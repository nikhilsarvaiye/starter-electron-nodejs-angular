import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomController } from './../../../../shared/controllers/dom/dom-controller';
import { UserService } from './../../user.service'
import { IUserModel } from './../../user.model';
import { UserConstants } from './../../user.constants'
import { UserValidation } from './../../user.model.validation'
import { ModalComponent } from './../../../../shared/services/modal/modal.component';

@Component({
  selector: 'register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  // ViewChild takes a class type or a reference name string.
  // Here we are using the type
  @ViewChild(ModalComponent) modal: ModalComponent;

  user: IUserModel = <IUserModel>{};
  form: FormGroup;

  constructor(private _userService: UserService, private router: Router, private formBuilder: FormBuilder) {

  }

  public ngOnInit() {
    console.log('hello `register` component');
    this.form = this.formBuilder.group({
      user_id: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  public submit() {

    let handleErrorResponse = UserValidation.validateRegisterForm(this.form.value);
    if (handleErrorResponse.errors) {
      this.modal.errorSummary("Form errors", handleErrorResponse.errors);
    }
    else {
      // remove confirm properties
      delete (<any>this.form.value).confirmPassword;

      this._userService.register(this.form.value).then((response) => {
        if (response.result) {
          this.modal.success(UserConstants.Messages.Success.userRegistered, () => {
            this.router.navigate(['login']);
          });
        }
        else {
          this.modal.errorSummary("Something went wrong", response.correlationId);
        }
      });
    }
  }

  ngAfterViewInit() {
    DomController.updateRegister();
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.form.value); }
}
