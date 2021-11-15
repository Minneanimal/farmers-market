import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonNav, ModalController } from '@ionic/angular';
import { PasswordFormComponent } from '../password-form/password-form.component';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  titleText: string;
  registrationForm = this.formBuilder.group({
    email: [''],
    firstname: [''],
    lastname: [''],
  });

  formValues = {};
  constructor(
    private modalController: ModalController,
    private ionNav: IonNav,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.titleText = "Let's get started!";

    this.registrationForm.valueChanges.subscribe(
      (formValues) => (this.formValues = formValues)
    );
  }

  async dismiss() {
    await this.modalController.dismiss();
  }

  onSubmit() {
    this.ionNav.push(PasswordFormComponent, { formValues: this.formValues });
  }
}
