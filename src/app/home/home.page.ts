import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AuthComponent } from '../modals/auth/auth.component';
import { SubNavModalComponent } from '../modals/modal-sub-nav/sub-nav-modal.component';
import { Category } from '../models/category.model';
import { FoodCategoriesService } from '../services/food-categories.service';
import { SignInOrRegister } from '../shared/enums/signin-or-register.enum';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  SignInOrRegister = SignInOrRegister;
  categories: Category[] = [];
  highlights = [];
  featured = [];

  catSlideOpts = {
    slidesPerView: 3.5,
    spaceBetween: 12,
    slidesOffsetBefore: 12,
    freeMode: true,
  };

  highlightSlideOpts = {
    slidesPerView: 1.05,
    spaceBetween: 12,
    centeredSlides: true,
    loop: true,
  };

  featuredSlideOpts = {
    slidesPerView: 1.2,
    spaceBetween: 12,
    freeMode: true,
  };

  showLocationDetail = false;

  constructor(
    private categoryService: FoodCategoriesService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http
      .get('https://devdactic.fra1.digitaloceanspaces.com/foodui/home.json')
      .subscribe((res: any) => {
        this.categories = res.categories;
        this.highlights = res.highlights;
        this.featured = res.featured;
      });

    this.categoryService
      .getCategories()
      .subscribe((categories) => this.categories.push(...categories));
  }

  // Dummy refresher function
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  // show or hide a location string later
  onScroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showLocationDetail = offset > 40;
  }

  async presentAuthModal(signInOrRegister: SignInOrRegister) {
    const modal = await this.modalController.create({
      component: SubNavModalComponent,
      componentProps: {
        rootPage: AuthComponent,
        rootParams: {
          signInOrRegister,
        },
      },
    });
    return await modal.present();
  }
}
