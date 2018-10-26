import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-customerlist',
  templateUrl: 'customerlist.html',
})
export class CustomerlistPage {

  public customer: Array<any> = [];
  public copycustomer: Array<any> = [];
  public Data: any;
  public usermobile: any;
  public response: any;
  public searchQuery: string = '';
  public items: string[];
  public loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public http: Http,
  ) {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 5000,
      content: "Loading...",
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerlistPage');
    this.usermobile = localStorage.getItem('mobile');
    // this.initializeItems();
    this.getcustomer();
  }
  initializeItems() {
    this.customer = [{ "mobile": "45632149", "name": "oest1" }, { "mobile": "7568943219", "name": "rest1" }, { "mobile": "745968319", "name": "test1" }, { "mobile": "735216949", "name": "test1" }, { "mobile": "5613278949", "name": "hest1" }, { "mobile": "6327894519", "name": "sest1" }];
    this.copycustomer = this.customer;
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();
    // set val to the value of the searchbar
    const val = ev.target.value;
    this.customer = this.copycustomer;
    if (!val) { return; }
    // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    this.customer = this.customer.filter((item) => {
      if (item.name && val) {
        if (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1) { return true; }
      }
      if (item.mobile && val) {
        if (item.mobile.toLowerCase().indexOf(val.toLowerCase()) > -1) { return true; }
      }
      // return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
    // }
  }
  getcustomer() {
    this.loading.present();
    this.Data = {
      mobile: this.usermobile
    };
    var link = 'https://www.freshcangrocery.in/sppi/getUserdata.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        // console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        console.log(this.response);
        if (this.response != "") {
          this.response.forEach(element => {
            this.customer.push(element);
          });
          // console.log(this.customer.length);
          this.copycustomer = this.customer;
        }
        this.loading.dismiss();
      }, error => {
        console.log("Oooops!");
      });
  }

}
