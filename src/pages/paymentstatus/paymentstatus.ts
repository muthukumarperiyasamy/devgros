import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, SegmentButton, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { OrdersPage } from '../orders/orders';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-paymentstatus',
  templateUrl: 'paymentstatus.html',
})
export class PaymentstatusPage {

  section: string;
  public order: Array<any> = [];
  public unpaid: Array<any> = [];
  public copyunpaid: Array<any> = [];
  public paid: Array<any> = [];
  public copypaid: Array<any> = [];
  public options: any;
  public website: any;
  public payment: any;
  public Data: any;
  public usermobile: any;
  public response: any;
  public loading: any;

  constructor(
    public navCtrl: NavController,
    public inAppBrowser: InAppBrowser,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public http: Http,
    public navParams: NavParams
  ) {
   
    this.usermobile = localStorage.getItem('mobile');
    this.section = "unpaid";
    // this.getdetails();
  }
  onSegmentChanged(segmentButton: SegmentButton) {
    console.log('Segment changed to', segmentButton.value);
  }
  onSegmentSelected(segmentButton: SegmentButton) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerlistPage');
    // this.initializeItems();
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 5000,
      content: "Loading...",
    });
    this.getdetails();

  }
  initializeItems() {
    this.order = [
      {
        "name": "Arun prasad", "address": "Qwerty, \r\nAsf, \r\nZx", "no_of_cans": "0", "shop_mobile": "7894563219", "delivery_price": "15", "mrp": "35", "shop_price": "30", "date": "13", "month": "Oct", "order_id": "1011399", "status": "on progress", "payment": "Unpaid", "delivery_time": "on progress", "grocery": [
          { "name": "Tea - Tulsi", "weight": "25 pcs", "quantity": 2 },
          { "name": "Tea - Tulsi Sweet Rose", "weight": "25 pcs", "quantity": 2 },
          { "name": "Colgate Toothpaste - Herbal", "weight": "100 gm", "quantity": 2 },
          { "name": "Britannia Biscuits - Marie Gold", "weight": "89 gm", "quantity": 3 },
          { "name": "Amaranthus", "weight": "500 gm", "quantity": 2 }], "time": "15:28 PM"
      },

      {
        "name": "Arun prasad", "address": "Qwerty, \r\nAsf, \r\nZx", "no_of_cans": "2", "shop_mobile": "7894563219", "delivery_price": "15", "mrp": "35", "shop_price": "30", "date": "13", "month": "Oct", "order_id": "1008897", "status": "on progress", "payment": "Paid", "delivery_time": "on progress", "grocery": "null", "time": "15:25 PM"
      },

      {
        "name": "Arun prasad", "address": "Qwerty, \r\nAsf, \r\nZx", "no_of_cans": "0", "shop_mobile": "7894563219", "delivery_price": "15", "mrp": "35", "shop_price": "30", "date": "11", "month": "Oct", "order_id": "10118897", "status": "on progress", "payment": "Unpaid", "delivery_time": "on progress", "grocery": [
          { "name": "Dabur -Lemoneez", "weight": "250 ml", "quantity": 1 },
          { "name": "Litchi Luscious", "weight": "1 L", "quantity": 1 },
          { "name": "Soy Milk-Natural Unsweetened", "weight": "200 ml", "quantity": 1 },
          { "name": "Nestle A+ Toned Milk", "weight": "1 L", "quantity": 1 },
          { "name": "Mix Dry Fruit", "weight": "50 gm", "quantity": 1 },
          { "name": "Peanuts", "weight": "50 gm", "quantity": 1 },
          { "name": "Peanuts", "weight": "70 gm", "quantity": 1 }], "time": "16:08 PM"
      },

      {
        "name": "Arun prasad", "address": "Qwerty, \r\nAsf, \r\nZx", "no_of_cans": "2", "shop_mobile": "7894563219", "delivery_price": "15", "mrp": "35", "shop_price": "30", "date": "21", "month": "Sep", "order_id": "0918666", "status": "on progress", "payment": "Unpaid", "delivery_time": "on progress", "grocery": "null", "time": "18:34 PM"
      },

      {
        "name": "Arun prasad", "address": "Qwerty, \r\nAsf, \r\nZx", "no_of_cans": "0", "shop_mobile": "7894563219", "delivery_price": "15", "mrp": "35", "shop_price": "30", "date": "18", "month": "Sep", "order_id": "0918494", "status": "on progress", "payment": "Unpaid", "delivery_time": "on progress", "grocery": [
          { "name": "Colgate Toothpaste - Herbal", "weight": "100 gm", "quantity": 1 },
          { "name": "Colgate Toothpaste - Visible White", "weight": "100 gm", "quantity": 1 },
          { "name": "Broad Beans", "weight": "120 gm", "quantity": 1 },
          { "name": "Peanuts", "weight": "42 gm", "quantity": 1 },
          { "name": "Mix Dry Fruit", "weight": "50 gm", "quantity": 1 },
          { "name": "Everest-Tandoori Chicken", "weight": "50 gm", "quantity": 1 },
          { "name": "Curry Leaves", "weight": "100 gm", "quantity": 1 },
          { "name": "Lemon", "weight": "250 gm", "quantity": 1 },
          { "name": "Coriander Leaves", "weight": "250 gm", "quantity": 1 }], "time": "12:20 PM"
      },

      {
        "name": "Arun prasad", "address": "Qwerty, \r\nAsf, \r\nZx", "no_of_cans": "1", "shop_mobile": "7894563219", "delivery_price": "15", "mrp": "35", "shop_price": "30", "date": "18", "month": "Sep", "order_id": "0918497", "status": "on progress", "payment": "Paid", "delivery_time": "on progress", "grocery": "null", "time": "11:46 AM"
      },

      {
        "name": "Testing", "address": "Dfhbvdvbh", "no_of_cans": "3", "shop_mobile": "7894563219", "delivery_price": "15", "mrp": "35", "shop_price": "30", "date": "17", "month": "Sep", "order_id": "0912523", "status": "on progress", "payment": "Unpaid", "delivery_time": "on progress", "grocery": "null", "time": "16:10 PM"
      },

      {
        "name": "Testing", "address": "Dfhbvdvbh", "no_of_cans": "1", "shop_mobile": "7894563219", "delivery_price": "15", "mrp": "35", "shop_price": "30", "date": "17", "month": "Sep", "order_id": "0912516", "status": "on progress", "payment": "Paid", "delivery_time": "on progress", "grocery": "null", "time": "16:10 PM"
      },

      {
        "name": "Testing", "address": "Dfhbvdvbh", "no_of_cans": "2", "shop_mobile": "7894563219", "delivery_price": "15", "mrp": "35", "shop_price": "30", "date": "17", "month": "Sep", "order_id": "0918497", "status": "on progress", "payment": "Unpaid", "delivery_time": "on progress", "grocery": "null", "time": "16:10 PM"
      },

      {
        "name": "Arun prasad", "address": "Qwerty, \r\nAsf, \r\nZx", "no_of_cans": "1", "shop_mobile": "7894563219", "delivery_price": "15", "mrp": "35", "shop_price": "30", "date": "15", "month": "Sep", "order_id": "0914510", "status": "on progress", "payment": "Paid", "delivery_time": "on progress", "grocery": "null", "time": "10:50 AM"
      },

      {
        "name": "Arun prasad", "address": "Qwerty, \r\nAsf, \r\nZx", "no_of_cans": "2", "shop_mobile": "7894563219", "delivery_price": "15", "mrp": "35", "shop_price": "30", "date": "12", "month": "Sep", "order_id": "0913383", "status": "on progress", "payment": "Unpaid", "delivery_time": "on progress", "grocery": "null", "time": "17:24 PM"
      },

      {
        "name": "Arun prasad", "address": "Qwerty, \r\nAsf, \r\nZx", "no_of_cans": "0", "shop_mobile": "7894563219", "delivery_price": "15", "mrp": "35", "shop_price": "30", "date": "12", "month": "Sep", "order_id": "0913433", "status": "on progress", "payment": "Paid", "delivery_time": "on progress", "grocery": [
          { "name": "Mysore Sandal Soap", "weight": "75 gm", "quantity": 1 },
          { "name": "Aachi-Sambar", "weight": "50 gm", "quantity": 1 },
          { "name": "Aachi -Chicken Kabab", "weight": "50 gm", "quantity": 1 },
          { "name": "Saunf Small", "weight": "50 gm", "quantity": 1 }], "time": "11:59 AM"
      },

      {
        "name": "Arun prasad", "address": "Qwerty, \r\nAsf, \r\nZx", "no_of_cans": "0", "shop_mobile": "7894563219", "delivery_price": "15", "mrp": "35", "shop_price": "30", "date": "12", "month": "Sep", "order_id": "0912552", "status": "on progress", "payment": "Unpaid", "delivery_time": "on progress", "grocery": [
          { "name": "Nestle A+ Toned Milk", "weight": "1 L", "quantity": 1 }], "time": "11:59 AM"
      },

      {
        "name": "Arun prasad", "address": "Qwerty, \r\nAsf, \r\nZx", "no_of_cans": "2", "shop_mobile": "7894563219", "delivery_price": "15", "mrp": "35", "shop_price": "30", "date": "12", "month": "Sep", "order_id": "0914510", "status": "on progress", "payment": "Paid", "delivery_time": "on progress", "grocery": "null", "time": "11:58 AM"
      }];
  }

  getdetails() {
    this.Data = {
      mobile: this.usermobile
    };
    var link = 'https://www.freshcangrocery.in/sppi/paymentStatus.php';
    var myData = JSON.stringify(this.Data);
    console.log(JSON.stringify(this.Data));
    this.loading.present();
    this.http.post(link, myData)
      .subscribe(data => {
        // console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        console.log(this.response);
        if (this.response != null) {
          this.response.reverse();
          this.response.forEach(element => {
            if (element.payment == "Unpaid") {
              this.unpaid.push(element);
            }
            if (element.payment == "Paid") {
              this.paid.push(element);
            }
          });
          this.paid.reverse();
          
          this.copyunpaid = this.unpaid;
          this.copypaid = this.paid;
          console.log("unpaid.............................");
          console.log(this.unpaid);
          console.log("Paid.............................");
          console.log(this.paid);
        }
        this.loading.dismiss();
      }, error => {
        console.log("Oooops!");
      });

  }
  updatetpayment(item) {

    if (item.payment == "Unpaid") {
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
          this.unpaid = [];
          this.paid = [];
          this.ionViewDidLoad();
          this.presentToast('Order payment Status changed to Paid.');
        }
        else {
          console.log('Failed');
          this.presentToast('Sorry, Please Try Again')
        }
      }, error => {
        console.log("Oooops!");
      });
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
    var modal = this.modalCtrl.create(OrdersPage, { id: item });
    modal.present();
    modal.onDidDismiss((data) => {
      console.log(data);
    });
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
  unpaidsearch(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;
    this.unpaid = this.copyunpaid;
    if (!val) {
      return;
    }
    // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    this.unpaid = this.unpaid.filter((item) => {
      if (item.name && val) {
        if (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
      }
      if (item.order_id && val) {
        if (item.order_id.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
      }
      // return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
  paidsearch(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();
    // set val to the value of the searchbar
    const val = ev.target.value;
    this.paid = this.copypaid;
    if (!val) {
      return;
    }
    // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    this.paid = this.paid.filter((item) => {

      if (item.name && val) {
        if (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
      }
      if (item.order_id && val) {
        if (item.order_id.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
      }
      // return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}
