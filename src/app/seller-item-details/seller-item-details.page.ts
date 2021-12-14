import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-seller-item-details',
  templateUrl: './seller-item-details.page.html',
  styleUrls: ['./seller-item-details.page.scss'],
})
export class SellerItemDetailsPage implements OnInit {
  isDisabled = true;
  constructor(private navController: NavController) {}

  ngOnInit() {}

  savePickupDeliveryProfile() {
    console.log('save as a profile clicked');
  }

  saveProduct() {
    console.log('save product');
  }

  cancelAndGoBack() {
    this.navController.back();
  }
}
