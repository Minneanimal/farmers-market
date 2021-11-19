import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AuthService, LoginDto } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  titleText: string;
  loginForm = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  formValues: LoginDto;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.titleText = 'Welcome';

    this.loginForm.valueChanges.subscribe(
      (formValues) => (this.formValues = formValues)
    );
  }

  async dismiss() {
    await this.modalController.dismiss();
  }

  onSubmit() {
    this.authService
      .login(this.formValues)
      .pipe(take(1))
      .subscribe((user) => {
        this.modalController.dismiss({
          user: user,
        });
      });
  }

  goToPasswordReset() {
    console.log('pass reset selected');
  }

  goToTemporaryPassword() {
    console.log('temp pass selected');
  }

  goToCreateAccount() {
    console.log('go to create selected');
  }
}
