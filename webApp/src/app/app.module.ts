import { NgModule, ApplicationRef, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-highcharts';
import { ReactiveFormsModule } from "@angular/forms";
import { Http, HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { Router, RouterModule, PreloadAllModules } from '@angular/router';
import { IdlePreload, IdlePreloadModule } from '@angularclass/idle-preload'
import { AdalService } from 'ng2-adal/core';
// import { ConfigModule, ConfigLoader, ConfigStaticLoader } from '@ngx-config/core';
import { ModalModule } from 'ng2-bootstrap';

import { ROUTES } from './app.routes';
// App component
import { AppComponent } from './app.component';

// Core components
import { AuthGuard, LoginGuard, AuthService, AdalAuthService, HttpInterceptor } from './core';

// Shared module
import { SharedModule } from './shared';

// new custom import
import { UserModule } from './modules/user/user.module';
import { ContentModule } from './modules/content';
import { ProfileModule } from './modules/profile';
import { ReportsModule } from './modules/reports';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    SharedModule,
    ChartModule.forRoot(require('highcharts')),
    ModalModule.forRoot(),
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules }),
    IdlePreloadModule.forRoot(), // forRoot ensures the providers are only created once
    UserModule,
    ContentModule,
    ProfileModule,
    ReportsModule
  ],
  providers: [
    AdalService,
    AuthGuard, 
    LoginGuard,
    AuthService,
    AdalAuthService,
    { 
      provide: Http, 
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, router: Router, authService: AuthService) => new HttpInterceptor(backend, defaultOptions, router, authService),
      deps: [XHRBackend, RequestOptions, Router, AuthService]
    }
  ],
  exports: []
})
export class AppModule {}
