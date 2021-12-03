import { Component, Input, OnInit } from '@angular/core';
import { IonNav, ModalController, NavParams, Platform } from '@ionic/angular';
import { SignInOrRegister } from 'src/app/shared/enums/signin-or-register.enum';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @Input() signInOrRegister: SignInOrRegister;

  headerText: string;
  titleText: string;
  bodyText: string;
  emailBtnText: string;
  appleBtnText: string;
  facebookBtnText: string;
  googleBtnText: string;

  constructor(
    private modalController: ModalController,
    private ionNav: IonNav,
    private navParams: NavParams,
    private platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(101, async () => {
      let canGoBack = await this.ionNav.canGoBack();
      if (canGoBack) {
        this.ionNav.pop();
      } else {
        await this.modalController.dismiss();
      }
      return;
    });
  }

  ngOnInit() {
    this.signInOrRegister = this.navParams.get('signInOrRegister');
    if (this.signInOrRegister === SignInOrRegister.Register) {
      this.headerText = 'Create an account';
      this.titleText = "Let's get started!";
      this.bodyText =
        'Use your email or continue with social to create an account.';
      this.emailBtnText = 'Use your email';
      this.appleBtnText = 'Continue with Apple';
      this.facebookBtnText = 'Continue with Facebook';
      this.googleBtnText = 'Continue with Google';
    } else {
      this.headerText = 'Sign In';
      this.titleText = 'Hello';
      this.bodyText =
        'You can user your email or username, or continue with your social account';
      this.emailBtnText = 'Use your email';
      this.appleBtnText = 'Sign in with Apple';
      this.facebookBtnText = 'Sign in with Facebook';
      this.googleBtnText = 'Sign with Google';
    }
  }

  goToEmailAuth() {
    if (this.signInOrRegister === SignInOrRegister.Register) {
      this.ionNav.push(RegistrationFormComponent);
    } else {
      this.ionNav.push(LoginFormComponent);
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
