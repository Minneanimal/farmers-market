import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import SwiperCore from 'swiper';
import { CreateKitchenComponent } from '../modals/create-kitchen/create-kitchen.component';
import { SubNavModalComponent } from '../modals/modal-sub-nav/sub-nav-modal.component';

@Component({
  selector: 'app-selling',
  templateUrl: './selling.page.html',
  styleUrls: ['./selling.page.scss'],
})
export class SellingPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  goToSendFeedBack() {
    console.log('go to feedback clicked');
  }

  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  async presentKitchenModal() {
    const modal = await this.modalController.create({
      component: SubNavModalComponent,
      componentProps: {
        rootPage: CreateKitchenComponent,
        rootParams: {
          hello: 'hello',
        },
      },
    });
    return await modal.present();
  }
}
