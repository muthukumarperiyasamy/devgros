import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-deliveryreport',
  templateUrl: 'deliveryreport.html',
})
export class DeliveryreportPage {
  loading: any;
  public item: any;
  public id: any;
  public name: any;
  public customermobile: any;
  public cans: any;
  public status: any;
  public deliverystatus: any;
  public payment: any;
  public mrpprice: number = null;
  public shopprice: number = null;
  public Data: any;
  public address: any;
  public response: any;
  public type: any;
  public time: any;
  public deltime: any;
  public orderlist: any;
  public order: Array<any> = [];
  public Dtoggle: boolean = false;
  public ctoggle: boolean = false;
  public deliverypricelist: any;
  public deliveryprice: any = 0;
  public cashcollect: any = 0;
  public discount: any = 0;
  public offer: any = 0;
  public offer_used: any;
  public max_cashback: any;
  public min_discount: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
  ) {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 5000,
      content: "Loading...",
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryreportPage');
    this.item = this.navParams.get('id');
    this.id = this.item.order_id;
    this.name = this.item.name;
    this.cans = this.item.no_of_cans;
    this.deliverystatus = this.item.status;
    this.payment = this.item.payment;
    this.address = this.item.address;
    this.type = this.item.type;
    this.cashcollect = this.item.cash_collect;
    if (this.cashcollect == undefined) {
      this.cashcollect = 0;
    }
    this.discount = this.item.discount_price;
    console.log(this.discount);
    if (this.discount == undefined) {
      this.discount = 0;
    }
    this.status = this.item.status;
    this.deliveryprice = this.item.delivery_price;
    if (this.deliveryprice == undefined) {
      this.deliveryprice = 0;
    }
    this.customermobile = this.item.user_mobile;
    console.log(this.item);
    // console.log(this.type);
    // console.log(this.status);
    this.time = new Date().getHours();
    // console.log(this.time);
    this.deltime = "Select";
    this.orderlist = this.item.grocery;
    if (this.orderlist != "null") {
      this.getgrocery();
      this.getdeliveryprice();
    }
    console.log(this.orderlist);
    if (this.item.shop_price != undefined) {
      this.mrpprice = this.item.mrp;
      this.shopprice = this.item.shop_price;
    }
    console.log(this.shopprice);
  }

  // ******************-----------calculate total shop price with Delivery charge----------*****************************
  getmrp(cost) {
    console.log(cost);
    // this.shopprice +=  Number(cost);
    // console.log(this.deliverypricelist);
    // this.Dtoggle = true;
    this.getcst();
    if(this.Dtoggle == true){
    this.deliverypricelist.forEach(element => {
      if (this.shopprice <= element.amount) {
        this.deliveryprice = element.charge;
      }
      if (this.shopprice > 999) {
        this.Dtoggle = false;
        this.deliveryprice = 0;
      }
    });
   } 
   console.log(this.shopprice);
    console.log(this.deliveryprice);
    console.log(this.discount);
    this.cashcollect = Number(this.shopprice) + Number(this.deliveryprice) - Number(this.discount);
    console.log(this.cashcollect);

  }
  // ******************************-----------Discount Toggle Action Code----------***************************************
  notifydiscount() {
    console.log(this.ctoggle);
    if (this.ctoggle == true) {
      this.discount = 0;
      console.log(this.shopprice);
      if (this.shopprice > this.min_discount) {
        if (this.Dtoggle == false) {
          this.deliveryprice = 0;
        }
        this.discount = ((this.offer / 100) * this.shopprice);
        this.discount = Math.round(this.discount);
        this.cashcollect = Number(this.shopprice) + Number(this.deliveryprice) - Number(this.discount);
      }
      else if (this.shopprice == null) {

      }
      else {
        let msg = "Discount Is applicable for Above Rs " + this.min_discount + " Only..";
        this.presentToast(msg);
        // this.ctoggle = false;
        //  console.log(this.ctoggle);
      }

    }
    else {
      this.cashcollect = Number(this.shopprice) + Number(this.deliveryprice);
    }
    if (this.discount > this.max_cashback) {
      console.log("Discount is above the cashback limit");
      this.discount = this.max_cashback;
    }
  }
  // ******************************-----------Delivery Toggle Action Code----------***************************************
  notify() {
    console.log(this.Dtoggle);
    if (this.Dtoggle == true) {
      this.getmrp("0");
    }
    else {
      this.deliveryprice = 0;
      this.cashcollect = Number(this.shopprice) + Number(this.deliveryprice) - Number(this.discount);
    }
  }
  // ******************************-----------calculate total shop price ----------****************************************
  getcst() {
    console.log("in");
    this.shopprice = 0;
    this.order.forEach(element => {
      this.shopprice += Number(element.cost);
    });
  }
  // *************************************----------Close the Modal----------**********************************************

  dismiss() {
    this.viewCtrl.dismiss();
  }
  // **********************************-----------Update Delivery Time if select dismiss----------************************
  updatedeltime() {
    if (this.deltime == "Select") {
      this.viewCtrl.dismiss();
    }
    else {
      this.updatetime();
    }
  }
  // ****************************-----------Get Grocery list From Database----------*************************************
  getgrocery() {
    this.loading.present();

    if (this.type == "new") {
      this.Data = {
        order_id: this.id,
      };
    }
    else {
      this.Data = {
        order_id: this.id + "-s",
      };
    }
    console.log(this.Data);
    var link = 'https://www.freshcangrocery.in/sppi/updategroceries.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        // console.log(data["_body"]);
        this.orderlist = JSON.parse(data["_body"]);
        console.log(this.orderlist);
        // if (this.response.status == "1") {
        this.orderlist.forEach(element => {
          if (this.type == "new") {
            element.cost = null;
          }
          this.order.push(element);
        });
        this.loading.dismiss();
        console.log(this.order);
        // }
        // else {
        //   console.log('Failed');
        //   this.presentToast('Sorry. Please Try Again')
        // }
      }, error => {
        console.log("Oooops!");
      });
  }
  // ******************************************-----------Get delivery price from DataBase----------***************************************************
  getdeliveryprice() {
    let data = {
      mobile: this.customermobile
    }
    console.log(data);
    console.log("inside the delivery price");
    
    var link = 'http://freshcangrocery.in/sppi/delivery_charge.php';
    var myData = JSON.stringify(data);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        let responce = JSON.parse(data["_body"]);
        this.deliverypricelist = responce.delivery_charge;
        this.offer_used = responce.offer_used;
        this.max_cashback = responce.max_cashback;
        this.min_discount = responce.min_discount;
        this.offer = responce.offer;
        console.log("delivery............");
        console.log(this.deliverypricelist);
        //  this.deliverypricelist.reverse();
      }, error => {
        console.log("Oooops!");
      });
  }
  // ******************************************-----------Update Delivery Time  to database----------***************************************************
  updatetime() {
    if (this.orderlist == "null") {
      this.order = null;
    }
    if (this.Dtoggle == false) {
      this.deliveryprice = "Free";
    }
    this.Data = {
      order_id: this.id,
      delivery_time: this.deltime,
      grocery: this.order,
      mrp: this.mrpprice,
      shop_price: this.shopprice,
      delivery_price: this.deliveryprice,
      cash_collect: this.cashcollect,
      discount: this.discount,
      offer_used: this.offer_used
    };
    console.log(this.Data);
    var link = 'https://www.freshcangrocery.in/sppi/update_del_time.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        // console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          console.log('success');
          this.presentToast('Order Delivery Status & Time Scheduled.');
          this.viewCtrl.dismiss();
        }
        else {
          console.log('Failed');
          this.presentToast('Sorry. Please Try Again')
        }
      }, error => {
        console.log("Oooops!");
      });
  }
  // ******************************-----------Update The Status Payment to Database----------*****************************************
  deliveredset(data) {
    console.log(data);
    this.Data = {
      order_id: this.id,
      status: 'Delivered',
      payment: data
    };
    console.log(JSON.stringify(this.Data));
    // var link = 'http://freshcan.in/api/shop_admin/update_status_payment.php';
    var link = 'https://www.freshcangrocery.in/sppi/update_status_payment.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          console.log('success');
          this.presentToast('Thanks for delivery !!');
          this.viewCtrl.dismiss();
        }
        else {
          console.log('Failed');
          this.presentToast('Sorry. Please Try Again')
        }
      }, error => {
        console.log("Oooops!");
      });
    // this.presentToast("Report Status  updated successfully");
    console.log(this.Data);
  }

  // ************************************-----------Toast Message Codes----------*********************************************

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      // duration: 3000,
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
}
