import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "./../../shared";

import { AuthService } from './../../core/service/auth.service';
import { IUserModel } from './user.model'
import { UserService } from './user.service'
import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [AuthService, UserService],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class UserModule {
}
