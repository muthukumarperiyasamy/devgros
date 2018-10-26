import { Component } from '@angular/core';
import {  NavController, LoadingController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  loading: any;
  public items: Array<any> = [];
  public usermobile: any;
  public list: any;
  public Data: any;
  public today: Array<any> = [];
  public others: Array<any> = [];
  public options: any;
  public website: any;
  constructor(
    public navCtrl: NavController,
    public http: Http,
    public navParams: NavParams,
    // public inAppBrowser: InAppBrowser,
    public loadingCtrl: LoadingController,
  ) {
    this.loading = this.loadingCtrl.create({ 
    spinner: 'bubbles',
    duration: 5000,
    content: 'Please wait...',
  });
   
  }

  ionViewDidLoad() {
    this.loading.present();
    console.log('ionViewDidLoad NotificationsPage');
    this.usermobile = localStorage.getItem('mobile');
    
        console.log('user client_code..... ' + this.usermobile);
        if (this.usermobile != "null") {
          this.getdata();
        }
  }
  getdata() {
    this.Data = {
      mobile: this.usermobile,
    }
    this.loading.present();
    console.log('datas....' + JSON.stringify(this.Data));
    var link = 'https://www.freshcangrocery.in/sppi/notifications.php';
    

    console.log(this.Data);
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        // console.log(data["_body"]);
        this.list = JSON.parse(data["_body"]);
        if (this.list != null) {
          // console.log(this.list.length);
          if (this.list.Today != null) {
            this.list.Today.forEach(element => {
              // console.log(element);
              this.today.push(element);
            });
          }
          if (this.list.Others != null) {
            this.list.Others.forEach(element => {
              // console.log(element);
              this.others.push(element);
            });
          }
        }
        this.loading.dismiss();
      }, error => {
        console.log("Oooops!");
      });
  }
  InAppBrowsera(page) {
    this.options = {
      location: 'yes',//Or 'no' 
      zoom: 'yes',//Android only ,shows browser zoom controls 
    }
    this.website = page.link+'?mobile='+this.usermobile;
    console.log(page.link);
    console.log(this.website);
    // this.inAppBrowser.create(this.website, this.options);
  }
}

