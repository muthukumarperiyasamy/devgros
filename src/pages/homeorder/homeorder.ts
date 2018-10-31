import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, NavParams, SegmentButton, ModalController } from 'ionic-angular';
import { DeliveryreportPage } from '../deliveryreport/deliveryreport';
import { Http } from '@angular/http';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@Component({
  selector: 'page-homeorder',
  templateUrl: 'homeorder.html',
})
export class HomeorderPage {

  loading: any;
  section: string;
  public neworder: Array<any> = [];
  public deliveredorder: Array<any> = [];
  public scheduledorder: Array<any> = [];
  public orderlist: Array<any> = [];
  public bulklist: Array<any> = [];
  public Data: any;
  public response: any;
  public payment: any;
  public usermobile: any;
  public items: Array<any> = [];
  constructor(
    public navCtrl: NavController,
    public http: Http,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private launchNavigator: LaunchNavigator,
    public navParams: NavParams) {
    this.section = "New orders";
  }
  onSegmentChanged(segmentButton: SegmentButton) {
    console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoporderPage');
    this.usermobile = localStorage.getItem('mobile');
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 5000,
      content: 'Please wait...',
    });
    this.getorderlist();
    this.getdeliveredorderlist();
    this.getundeliveredorderlist()
  }

  getorderlist() {
    this.Data = {
      mobile: this.usermobile,
    }
    this.loading.present();
    console.log('datas....' + JSON.stringify(this.Data));
    console.log("neworder............................");
    console.log(this.Data);
    // var link = 'http://freshcan.in/api/shop_admin/get_orders_can_undel.php';
    var link = 'https://www.freshcangrocery.in/sppi/get_orders_can_undel.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        this.orderlist = JSON.parse(data["_body"]);
        // console.log(data["_body"]);
        if (this.orderlist.length != 0) {
          this.orderlist.forEach(element => {
            element.type = "new";
            this.neworder.push(element);
          });
          console.log("neworder............................");
          console.log(this.neworder);
        }
        this.loading.dismiss();
      }, error => {
        console.log("Oooops!");
      });
  }
  getdeliveredorderlist() {
    this.Data = {
      mobile: this.usermobile,
    }
    // this.loading.present();
    console.log("deliveredorder.............................");
    console.log('datas....' + JSON.stringify(this.Data));
    var link = 'https://www.freshcangrocery.in/sppi/get_orders_can_del.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        // console.log(data["_body"]);
        this.bulklist = JSON.parse(data["_body"]);
        if (this.bulklist != null) {
          this.bulklist.forEach(element => {
            this.deliveredorder.push(element);
          });
          console.log("deliveredorder.............................");
          console.log(this.deliveredorder);
        }
        // this.loading.dismiss();
      }, error => {
        console.log("Oooops!");
      });
  }
  getundeliveredorderlist() {
    this.Data = {
      mobile: this.usermobile,
    }

    console.log('datas....' + JSON.stringify(this.Data));
    console.log("scheduled order...........................");
    console.log(this.Data);
    var link = 'https://www.freshcangrocery.in/sppi/get_orders_all.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        this.bulklist = JSON.parse(data["_body"]);
        if (this.bulklist.length != 0) {
          this.bulklist.forEach(element => {
            this.scheduledorder.push(element);
          });
          console.log("scheduled order...........................");
          console.log(this.scheduledorder);
        }

      }, error => {
        console.log("Oooops!");
      });
  }
  updatetpayment(item) {

    if (item.payment =="Unpaid") {
      this.payment = "Paid";
    }
    else {
      this.payment = "Unpaid"
    }
    this.Data = {
      order_id: item.order_id,
      payment: this.payment,
    };
    console.log(JSON.stringify(this.Data));
    var link = 'https://www.freshcangrocery.in/sppi/update_payment.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          console.log('success');
          this.neworder = [];
          this.deliveredorder = [];
          this.scheduledorder = [];
          this.ionViewDidLoad();
          this.presentToast('Order payment status changed to paid.');
        }
        else {
          console.log('Failed');
          this.presentToast('Sorry, Please Try Again')
        }
      }, error => {
        console.log("Oooops!");
      });
    console.log(this.Data);
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Ok'
      // dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  nextpage(item) {
    var modal = this.modalCtrl.create(DeliveryreportPage, { id: item });
    modal.present();
    modal.onDidDismiss((data) => {
      console.log(data);
      this.ionViewDidLoad()
      this.neworder = [];
      this.deliveredorder = [];
      this.scheduledorder = [];

    });
  }

  navigate(latlong) {
    let options: LaunchNavigatorOptions = {
      // start: 'London, ON',
      app: this.launchNavigator.APP.GOOGLE_MAPS
    };

    this.launchNavigator.navigate(latlong, options)
      .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
      );
  }
}
