import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController, IonNav, NavParams, Platform } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { KitchenService } from 'src/app/services/kitchen.service';
import { CreateKitchenDto } from 'src/app/shared/dtos/create-kitchen.dto';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-create-kitchen',
  templateUrl: './create-kitchen.component.html',
  styleUrls: ['./create-kitchen.component.scss'],
})
export class CreateKitchenComponent implements OnInit {
  headerText = 'Create A Kitchen';
  kitchNameFormControl = new FormControl([
    '',
    Validators.required,
    Validators.maxLength(50),
  ]);

  kitchenName: string;

  constructor(
    private modalController: ModalController,
    private ionNav: IonNav,
    private navParams: NavParams,
    private platform: Platform,
    private kitchenService: KitchenService
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
    this.kitchNameFormControl.valueChanges.subscribe(
      (values) => (this.kitchenName = values)
    );
  }

  createKitchen() {
    const newKitchen: CreateKitchenDto = { name: this.kitchenName };
    this.kitchenService
      .createKitchen(newKitchen)
      .pipe(take(1))
      .subscribe((data) => console.log(data));
  }

  checkAvailability() {
    console.log('fix me');
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
