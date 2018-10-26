import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subcategory2Page } from '../subcategory2/subcategory2';
import { Slides } from 'ionic-angular';
@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html',
})
export class SubcategoryPage {

  @ViewChild('slides') slides1: Slides;
  @ViewChild('slides2') slides2: Slides;
  currentIndex1 = 0;
  currentIndex2 = 0;
  public shoptype: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoryPage');
    this.shoptype = localStorage.getItem('shoptype');
  }
  product(data,sub) {
    let value = {
      category: data,
      sub_category: sub,
      
    }
    console.log(data);
    this.navCtrl.push(Subcategory2Page, value);
  
}
next() {
  // this.currentIndex1 = this.slides1.getActiveIndex();
  // this.slides1.slideNext();
  console.log('Slide changed! Current index is', this.currentIndex1);
}

prev() {
  // this.currentIndex1 = this.slides1.getActiveIndex();
  // this.slides1.slidePrev();
  console.log('Slide changed! Current index is', this.currentIndex1);
}
next1() {
  // this.currentIndex1 = this.slides1.getActiveIndex();
  // this.slides1.slideNext();
  console.log('Slide changed! Current index is', this.currentIndex1);
}

prev1() {
  // this.currentIndex1 = this.slides1.getActiveIndex();
  // this.slides1.slidePrev();
  console.log('Slide changed! Current index is', this.currentIndex1);
}
next2() {
  // this.currentIndex2 = this.slides2.getActiveIndex();
  // this.slides2.slideNext();
  console.log('Slide changed! Current index is', this.currentIndex2);
}

prev2() {
  // this.currentIndex2 = this.slides2.getActiveIndex();
  // this.slides2.slidePrev();
  console.log('Slide changed! Current index is', this.currentIndex2);
}

}
