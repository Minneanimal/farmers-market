import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService, CreateUserDto } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
})
export class PasswordFormComponent implements OnInit {
  @Input() formValues;
  password = new FormControl('');
  passValue;
  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) {}

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
    const newUser: CreateUserDto = {
      ...this.formValues,
      password: this.passValue,
    };
    this.authService
      .register(newUser)
      .pipe(take(1))
      .subscribe((data) => console.log(data));
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
