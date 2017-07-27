/*
 * @author: NikhilS
*/
import { Injectable }  from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild {
  
  constructor(private authService: AuthService, private router: Router) {}

  /*
   * ActivatedRouteSnapshot contains the future route that will be activated 
   * RouterStateSnapshot contains the future RouterState of the application, should you pass through the guard check
   * 
   * The canActivate can return an Observable<boolean> or Promise<boolean> for async checks and a boolean for sync checks
  */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  /* 
   * protect child routes with the CanActivateChild guard 
   * CanActivateChild guard is similar to the CanActivate guard. 
   * The key difference is that it runs before any child route is activated
   * 
   * The canActivateChild can return an Observable<boolean> or Promise<boolean> for async checks and a boolean for sync checks
  */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (!this.authService.isLoggedIn()) { return true; }

    // Navigate to the login page with extras
    this.router.navigate(['']);
    return false;
  }

}