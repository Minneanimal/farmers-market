import { Component, OnInit } from '@angular/core';
import { ModalController, IonNav, NavParams, Platform } from '@ionic/angular';

@Component({
  selector: 'app-create-kitchen',
  templateUrl: './create-kitchen.component.html',
  styleUrls: ['./create-kitchen.component.scss'],
})
export class CreateKitchenComponent implements OnInit {
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

  ngOnInit() {}
}
