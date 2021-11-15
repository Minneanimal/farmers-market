import { Component, OnInit } from '@angular/core';
import { IonNav, ModalController } from '@ionic/angular';
import { PasswordFormComponent } from '../password-form/password-form.component';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  titleText: string;
  constructor(
    private modalController: ModalController,
    private ionNav: IonNav
  ) {}

  ngOnInit() {
    this.titleText = "Let's get started!";
  }

  async dismiss() {
    await this.modalController.dismiss();
  }

  continueClicked() {
    this.ionNav.push(PasswordFormComponent);
  }
}
