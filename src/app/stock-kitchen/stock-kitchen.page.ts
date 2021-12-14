import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-kitchen',
  templateUrl: './stock-kitchen.page.html',
  styleUrls: ['./stock-kitchen.page.scss'],
})
export class StockKitchenPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  save() {
    console.log('save');
  }

  onClick() {}

  goToAddNewItem() {
    this.router.navigate(['seller-item-details']);
  }

  goToItem(itemId: number) {
    console.log(itemId);
  }
}
