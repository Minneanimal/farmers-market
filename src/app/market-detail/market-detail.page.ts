import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { IonContent, IonList, IonSlides } from '@ionic/angular';
import { isPlatform } from '@ionic/core';

@Component({
  selector: 'app-market-detail',
  templateUrl: './market-detail.page.html',
  styleUrls: ['./market-detail.page.scss'],
})
export class MarketDetailPage implements OnInit {
  data = null;

  opts = {
    freeMode: true,
    slidesPerView: 2.6,
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 100,
  };

  activeCategory = 0;
  @ViewChildren(IonList, { read: ElementRef }) lists: QueryList<ElementRef>;
  listElements = [];
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild(IonContent) content: IonContent;
  categorySlidesVisible = false;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.http
      .get('https://devdactic.fra1.digitaloceanspaces.com/foodui/1.json')
      .subscribe((res: any) => {
        this.data = res;
      });

    // Set the header position for sticky slides
    const headerHeight = isPlatform('ios') ? 44 : 56;
    this.document.documentElement.style.setProperty(
      '--header-position',
      `calc(env(safe-area-inset-top) + ${headerHeight}px)`
    );
  }

  // Get all list viewchildren when ready
  ngAfterViewInit() {
    this.lists.changes.subscribe((_) => {
      this.listElements = this.lists.toArray();
    });
  }

  // Handle click on a button within slides
  // Automatically scroll to viewchild
  selectCategory(index) {
    const child = this.listElements[index].nativeElement;
    this.content.scrollToPoint(0, child.offsetTop - 120, 1000);
  }

  // Listen to ion-content scroll output
  // Set currently visible active section
  onScroll(ev) {
    const offset = ev.detail.scrollTop;
    this.categorySlidesVisible = offset > 500;

    for (let i = 0; i < this.listElements.length; i++) {
      const item = this.listElements[i].nativeElement;
      if (this.isElementInViewport(item)) {
        this.activeCategory = i;
        this.slides.slideTo(i);
        break;
      }
    }
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    );
  }
}
