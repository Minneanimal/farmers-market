import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockKitchenPageRoutingModule } from './stock-kitchen-routing.module';

import { StockKitchenPage } from './stock-kitchen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockKitchenPageRoutingModule
  ],
  declarations: [StockKitchenPage]
})
export class StockKitchenPageModule {}
