import { Component } from '@angular/core';
import { NavController,  App } from 'ionic-angular';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login';
import { HomeorderPage } from '../homeorder/homeorder';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  section: string;
  public order: Array<any> = [];

  images: Array<string> = [];
  public Data: any;
  public username: any;
  public response: any;
  public usermobile: any;
  public toggle: boolean = true;
  public togglex: string;
  public newordered: number = 0;
  public scheduled: number = 0;
  public delivered: number = 0;
  constructor(
    public navCtrl: NavController,
    public http: Http,
    public app: App
  ) {
    this.images = [
      'http://www.freshcangrocery.in/images/shop_slider_1.jpg',
      'http://www.freshcangrocery.in/images/shop_slider_2.jpg',
      'http://www.freshcangrocery.in/images/shop_slider_3.jpg',
    ];
    this.section = "orders";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.usermobile = localStorage.getItem('mobile');
    this.username = localStorage.getItem('username');
    this.togglex = localStorage.getItem('togglex');
    if (this.togglex == "false") {
      this.toggle = false ;
    }
    else
      this.toggle = true;
    console.log(this.username);
    this.getreport();
  }

  notify() {
    console.log(this.toggle);
    if (this.toggle == true) {
      this.togglex = "true";
    }
    else
      this.togglex = "false";
    this.Data = {
      mobile: this.usermobile,
      availability: this.togglex

    }
    console.log(JSON.stringify(this.Data));
    // var link = 'http://freshcan.in/api/shop_admin/shop_availability.php';
    var link = 'https://www.freshcangrocery.in/sppi/shop_availability.php';
    
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          console.log('success');
          localStorage.setItem('togglex', this.togglex);
          
        }
        else {
          console.log('Failed');
        }
      }, error => {
        console.log("Oooops!");
      });
  }
  getreport() {
    this.Data = {
      mobile: this.usermobile,
    }
    var link = 'https://www.freshcangrocery.in/sppi/get_count_details.php';
    var myData = JSON.stringify(this.Data);
    console.log(myData);

    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        console.log(this.response);
        this.newordered = this.response.new_orders;
        this.delivered = this.response.delivered_orders;
        this.scheduled = this.response.scheduled_orders;
      }, error => {
        console.log("Oooops!");
      });
  }
  orderpage() {
    this.navCtrl.push(HomeorderPage);
  }
  logout() {
    console.log("onclick logout");
    this.app.getRootNav().push(LoginPage);
    localStorage.clear();
  }
}
