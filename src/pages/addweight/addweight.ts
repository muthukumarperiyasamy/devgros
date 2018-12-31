import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-addweight',
  templateUrl: 'addweight.html',
})
export class AddweightPage {
  public volume: Array<any> = [];
  public volume1: any;
  public weight: any = "";
  public price: any = "";
  public spprice: any = "";
  public discount: any = "";
  public category: any = "";

  constructor(public navCtrl: NavController,
    public view: ViewController,
    public navParams: NavParams) {
    this.category = this.navParams.get('category');
    this.volume1 = this.navParams.get('volume');

    console.log(this.category);
    if (this.volume1 != "") {
      console.log(".......................");
      this.volume = this.volume1;
    }
    console.log(this.volume);

  }

  caldisc() {
    let mrp = this.price;
    let sp = this.spprice;
    let discount = ((mrp - sp) * 100) / mrp;
    this.discount = Math.round(discount) //  6

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddweightPage');
  }
  dismiss(data) {
    this.view.dismiss(data);
  }
  add() {
    console.log(this.weight);
    console.log(this.price);
    console.log(this.spprice);
    console.log(this.discount);
    if (this.spprice != "") {
      this.caldisc();
    }
    if (this.weight || this.price != "") {
      let data = {
        weight: this.weight,
        price: this.spprice,
        mrp_price: this.price,
        discount: this.discount
      }
      this.volume.push(data);
      console.log(this.volume);
    }
    this.weight = "";
    this.price = "";
    this.spprice = "";
    this.discount = "";
  }
  delete(item) {
    console.log(item);
    const index: number = this.volume.indexOf(item);
    if (index !== -1) {
      this.volume.splice(index, 1);
    }
  }
  cancel() {
    this.dismiss(this.volume);
  }
}
