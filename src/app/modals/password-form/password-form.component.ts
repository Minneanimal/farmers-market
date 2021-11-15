import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
})
export class PasswordFormComponent implements OnInit {
  @Input() formValues;
  password = new FormControl('');
  passValue;
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.password.valueChanges.subscribe((pass) => (this.passValue = pass));
  }

  openUserAgreement() {
    console.log('Open User Agreement');
  }

  openPrivacyNotice() {
    console.log('Open Privacy Notice');
  }

  createAccount() {
    console.log({ ...this.formValues, password: this.passValue });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
