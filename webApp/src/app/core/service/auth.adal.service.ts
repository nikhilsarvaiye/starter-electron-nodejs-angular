import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUserModel } from './../../modules/user/user.model';
import { AdalService } from 'ng2-adal/core';

@Injectable()
export class AdalAuthService {

    constructor(private router: Router, private readonly _adalService: AdalService) {
        this._adalService.init(this.adalConfig());
        if (!_adalService.userInfo.isAuthenticated) {
            this._adalService.handleWindowCallback();
        }
    }

    public login(): void {
        this._adalService.login();
    }

    public get config(): adal.Config {
        return this._adalService.config;
    }

    public get isAuthenticated(): boolean {
        return this._adalService.userInfo.isAuthenticated;
    }

    public get upn(): string {
        return this._adalService.userInfo.userName;
    }

    public get profile(): any {
        return this._adalService.userInfo.profile;
    }

    public signIn(): void {
        return this._adalService.login();
    }

    public signOut(): void {
        return this._adalService.logOut();
    }

    public getToken(): string {
        return this._adalService.getCachedToken(this._adalService.config.clientId);
    }

    private adalConfig(): adal.Config {
        const config = {
            tenant: 'CTPSoftware.onmicrosoft.com',
            clientId: 'd7419ba9-249e-47e0-a252-d583b0f02a66',
            redirectUri: window.location.origin + '/',
            postLogoutRedirectUri: window.location.origin + '/',
            cacheLocation: 'localStorage',
            popUp: true
        };

        // clientSecret: 'teXSZsb6KxSfocP+sUh/eeFRi/1UNaZx87LZLXAOghY=',
        // callbackURL: 'http://localhost:4000',
        // resource: 'https://CTPSoftware.onmicrosoft.com/ctpdynamicsapi',
        // useCommonEndpoint: true

        return config;
    }
}