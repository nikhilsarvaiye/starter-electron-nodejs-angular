import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';
import { IUserModel } from './../../modules/user/user.model';

@Injectable()
export class AuthService {

    public loginRoute: string;
    public headerKey: string;
    private tokenStorageKey: string;
    private userStorageKey: string;
    private router: Router;

    constructor(router: Router) {
        this.loginRoute = 'login';
        this.headerKey = 'authorization';
        this.tokenStorageKey = 'id_token';
        this.router = router;
    }

    isLoggedIn(): boolean {
        let token = localStorage.getItem(this.tokenStorageKey);
        if (token)
            return true;
        else
            return false;
    }

    getToken(): string {
        return localStorage.getItem(this.tokenStorageKey);
    }

    getAuthHeaders(headers: Headers): Headers {
        headers = headers || new Headers();
        if (!headers.has('authorization')) {
            headers.append('authorization', this.getToken());
        }
        return headers;
    }

    getUserDetails(): IUserModel {
        return <IUserModel>(JSON.parse(localStorage.getItem(this.userStorageKey)));
    }

    logout(): void {
        localStorage.clear();
        this.router.navigate([this.loginRoute]);
    }

    saveDetails(res: any): string {
        let token = this.setToken(res.result);
        if (token) {
            this.router.navigate(['']);
        }
        return token;
    }

    setToken(res: any): string {
        if (res.token) {
            localStorage.setItem(this.tokenStorageKey, res.token);
            return this.getToken();
        }
        return "";
    }

    removeToken(): void {
        localStorage.removeItem(this.tokenStorageKey);
    }

    setUserDetails(res: any): void {
        if (res.user) {
            localStorage.setItem(this.userStorageKey, JSON.stringify(res.user));
        }
    }
}