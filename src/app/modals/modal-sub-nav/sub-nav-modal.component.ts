import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonNav } from '@ionic/angular';
import { NavComponent } from '@ionic/core';

@Component({
  selector: 'app-sub-nav-modal',
  template: '<ion-nav #subNav></ion-nav>',
  styleUrls: [],
})
export class SubNavModalComponent implements OnInit {
  @Input() rootPage: NavComponent;
  @Input() rootParams: {};

  @ViewChild('subNav', { static: true }) modalNav: IonNav;

  constructor() {}

  ngOnInit() {
    this.modalNav.setRoot(this.rootPage, this.rootParams);
  }
}
