import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OneSignal } from '@ionic-native/onesignal';
import { Http } from '@angular/http';
import { Market } from '@ionic-native/market';

import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { ProfilePage } from '../pages/profile/profile';
import { ContactPage } from '../pages/contact/contact';
import { PasswordPage } from '../pages/password/password';
import { NotificationPage } from '../pages/notification/notification';
import { TimeslotPage } from '../pages/shopsettings/shopsettings';
import { HomeorderPage } from '../pages/homeorder/homeorder';
import { AboutPage } from '../pages/about/about';
import { CustomerlistPage } from '../pages/customerlist/customerlist';
import { FeedbackPage } from '../pages/feedback/feedback';

import { SubcategoryPage } from '../pages/subcategory/subcategory';
import { AddproductPage } from '../pages/addproduct/addproduct';
import { PaymentstatusPage } from '../pages/paymentstatus/paymentstatus';

// import { HomePage } from '../pages/home/home';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  // make WalkthroughPage the root (or first) page
  // rootPage: any = HomePage;
  rootPage: any;
  public orderid: any;
  public Data: any;
  public dynamic: Array<any> = [];
  public list: Array<any> = [];
  public options: any;
  public usermobile: any;
  public username: any;
  public shoptype: any = 0;
  public response: any;
  public actionid: any;
  public orderidd: any;
  public version: any = "0.0.1";

  pages: Array<{ title: string, icon: string, component: any }>;
  pushPages: Array<{ title: string, icon: string, component: any }>;
  public website: any;
  constructor(
    platform: Platform,
    public menu: MenuController,
    public app: App,
    private market: Market,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public http: Http,
    public inAppBrowser: InAppBrowser,
    public _OneSignal: OneSignal,
    public alertCtrl: AlertController,
  ) {

    this.usermobile = localStorage.getItem('mobile');
    this.username = localStorage.getItem('username');
    this.shoptype = localStorage.getItem('shoptype');
    console.log(this.shoptype);
    console.log(this.usermobile);
    console.log(this.username);
    // if (this.usermobile == null) {
    //   this.shoptype = 0
    // }
    if (this.usermobile == null) {
      this.rootPage = WalkthroughPage;
    }
    else {
      this.rootPage = TabsNavigationPage;
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      this._OneSignal.startInit("eb0f8c59-43ac-438a-a909-84a2dd82e398", "183990619215");
      this._OneSignal.inFocusDisplaying(this._OneSignal.OSInFocusDisplayOption.Notification);
      this._OneSignal.setSubscription(true);
      this._OneSignal.handleNotificationReceived().subscribe(() => {
        // handle received here how you wish.
      });
      this._OneSignal.handleNotificationOpened().subscribe((data) => {
                            // handle opened here how you wish.
                            // console.log(data);
                            // console.log(data.action.actionID);
                            // this.actionid = data.action.actionID;
                            // console.log(data.notification.payload.additionalData.orderid);
                            // this.orderidd = data.notification.payload.additionalData.orderid;
                            // console.log(data.notification.payload.title);
                            // if (this.actionid != (undefined)) {
                            // this.update();
                            // }
      });
      this._OneSignal.endInit();
    });

    this.getversion();
    this.getdata();
  }
  goHome() {
    this.nav.push(TabsNavigationPage);
  }
  Order() {
    this.nav.push(TimeslotPage);
  }
  todayorder() {
    this.nav.push(HomeorderPage);
  }
  profile() {
    this.nav.push(ProfilePage);
  }
  changepassword() {
    this.nav.push(PasswordPage);
  }
  notification() {
    this.nav.push(NotificationPage);
  }
  Prodcategory() {
    this.nav.push(SubcategoryPage);
  }
  Addproduct() {
    this.nav.push(AddproductPage);
  }
  contact() {
    this.nav.push(ContactPage);
  }
  termsconditions() {
    this.nav.push(TermsOfServicePage);
  }
  Customers() {
    this.nav.push(CustomerlistPage);
  }
  payment() {
    this.nav.push(PaymentstatusPage);
  }
  feedback() {
    this.nav.push(FeedbackPage);
  }
  about() {
    this.nav.push(AboutPage);
  }

  InAppBrowsera(page) {

    this.options = {
      location: 'yes',//Or 'no' 
      zoom: 'yes',//Android only ,shows browser zoom controls 
      hidden: 'yes',
      hideurlbar: 'yes'
    }
    let mobile = localStorage.getItem('mobile');
    this.website = "https://www.freshcangrocery.in/wadmin/redirect.php?order_history_mobile=" + mobile;//?mobile
    console.log(this.website);
    this.inAppBrowser.create(this.website, this.options);
  }
  InAppBrowser() {
    this.options = {
      location: 'yes',//Or 'no' 
      zoom: 'yes',//Android only ,shows browser zoom controls 
      hidden: 'yes',
      hideurlbar: 'yes'
    }
    this.website = 'http://freshcan.in/faqvideo.html'
    console.log(this.website);
    this.inAppBrowser.create(this.website, this.options);
  }
  getdata() {
    this.Data = {
      data: 'getmenu',
    }
    console.log('datas....' + JSON.stringify(this.Data));
    var link = 'https://www.freshcangrocery.in/sppi/menu_json.php';
    console.log(this.Data);
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        // console.log(data["_body"]);
        this.list = JSON.parse(data["_body"]);
        console.log(this.list);
        this.list.forEach(element => {
          console.log(element);
          this.dynamic.push(element);
        });

      }, error => {
        console.log("Oooops!");
      });

  }
  getversion() {
    this.Data = {
      data: 'admin',
    }
    console.log('datas....' + JSON.stringify(this.Data));
    var link = 'https://www.freshcangrocery.in/sppi/version_check.php';
    console.log(this.Data);
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        this.response = JSON.parse(data["_body"]);
        console.log(this.response);

        if (this.response.version == this.version) {
          console.log("updated version");
        }
        else {
          console.log('update available');
          this.showupdate();
        }
      }, error => {
        console.log("Oooops!");
      });
  }
  // update() {
  //   this.Data = {
  //     delivery_time: this.actionid,
  //     order_id: this.orderidd,
  //   };
  //   console.log('datas....' + JSON.stringify(this.Data));
  //   var link = 'http://www.freshcan.in/api/shop_admin/update_del_time.php';
  //   var myData = JSON.stringify(this.Data);
  //   this.http.post(link, myData)
  //     .subscribe(data => {
  //       console.log(data["_body"]);
  //       data["_body"];
  //       this.response = JSON.parse(data["_body"]);
  //       if (this.response.status == "1") {
  //         console.log("success");
  //       }
  //       else {
  //         console.log(' updated Failed');

  //       }
  //     }, error => {
  //       console.log("Oooops!");
  //     });
  // }

  showupdate() {
    let confirm = this.alertCtrl.create({
      title: 'Update Available',
      message: 'There is a newer version of Fresh Can Shop Available. Update now? ',
      buttons: [
        {
          text: ' Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            console.log('OK clicked');
            this.market.open('io.freshcan.shop');
          }
        }
      ]
    });
    confirm.present();
  }

}
