import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
})
export class PasswordFormComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  openUserAgreement() {
    console.log('Open User Agreement');
  }

  openPrivacyNotice() {
    console.log('Open Privacy Notice');
  }

  createAccount() {
    console.log('create account');
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
