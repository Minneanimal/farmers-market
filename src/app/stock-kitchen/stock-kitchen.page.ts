import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-kitchen',
  templateUrl: './stock-kitchen.page.html',
  styleUrls: ['./stock-kitchen.page.scss'],
})
export class StockKitchenPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  save() {
    console.log('save');
  }

  onClick() {}

  goToAddNewItem() {}
  goToItem(itemId: number) {
    console.log(itemId);
  }
}
