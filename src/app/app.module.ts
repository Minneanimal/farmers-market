import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './modals/auth/auth.component';
import { SubNavModalComponent } from './modals/modal-sub-nav/sub-nav-modal.component';
import { RegistrationFormComponent } from './modals/registration-form/registration-form.component';
import { PasswordFormComponent } from './modals/password-form/password-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SubNavModalComponent,
    RegistrationFormComponent,
    PasswordFormComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
