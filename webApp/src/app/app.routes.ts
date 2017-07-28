import { Routes } from '@angular/router';
import { ContentComponent } from './modules/content';
import { FeedComponent } from './modules/feed';
import { ProfileComponent } from './modules/profile';
import { ReportsComponent } from './modules/reports';
import { LoginComponent } from './modules/user/components/login/login.component';
import { RegisterComponent } from './modules/user/components/register/register.component';
import { AuthGuard } from './core/service/auth-guard.service';
import { LoginGuard } from './core/service/login-guard.service';

export const ROUTES: Routes = [
  { path: '', component: ContentComponent, canActivate: [AuthGuard], data: { Roles: ["User"] } },
  { path: 'feed', component: FeedComponent, canActivate: [AuthGuard], data: { Roles: ["User"] } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { Roles: ["User"] } },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard], data: { Roles: ["User"] } },
  { path: 'login',  component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  // { path: 'detail', loadChildren: './+detail#DetailModule'},
  // { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  // { path: '**',    component: NoContentComponent },
];
  