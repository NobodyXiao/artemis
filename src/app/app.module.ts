import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_CONFIG, APP_DI_CONFIG } from './app-config';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { HttpClientModule } from '@angular/common/http';
import { CanDeactivateGuard } from '../app/guards/can-deactivate.guard';
import { AuthGuard } from '../app/guards/auth-guard.service';
import { FrameworkModule } from '../app/components/framework/framework.module';
import { WindowRefService } from '../../src/app/services/window-ref.service';

export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({tokenName: 'jwt', noJwtError: true}), http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpModule,
    FrameworkModule
  ],
  providers: [
    {provide: APP_CONFIG, useValue: APP_DI_CONFIG },
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http]
    },
    CanDeactivateGuard,
    AuthGuard,
    WindowRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
