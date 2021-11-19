import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './modals/auth/auth.component';
import { SubNavModalComponent } from './modals/modal-sub-nav/sub-nav-modal.component';
import { RegistrationFormComponent } from './modals/registration-form/registration-form.component';
import { PasswordFormComponent } from './modals/password-form/password-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './modals/login-form/login-form.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SubNavModalComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    PasswordFormComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
