import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellingPageRoutingModule } from './selling-routing.module';

import { SellingPage } from './selling.page';

import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellingPageRoutingModule,
    SwiperModule,
  ],
  declarations: [SellingPage],
})
export class SellingPageModule {}
