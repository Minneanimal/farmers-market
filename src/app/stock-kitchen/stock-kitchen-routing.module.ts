import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockKitchenPage } from './stock-kitchen.page';

const routes: Routes = [
  {
    path: '',
    component: StockKitchenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockKitchenPageRoutingModule {}
