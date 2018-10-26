import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
// import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'page-shopsettings',
  templateUrl: 'shopsettings.html',
})
export class TimeslotPage {
  public Data: any;
  public response: any;
  public costselling: any;
  public buying: any;
  public invested: any;
  public damaged: any;
  public appcost: any;
  public cancost: any;
  public usermobile: any;
  public can: boolean = true;
  public grocerry: boolean = false;
  public vegetables: boolean = false;
  public shoptype: any;
  public vegetablesq: any;
  public product: any;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    // private DatePicker: DatePicker,
    public http: Http,
    public navParams: NavParams,
  ) {
    this.appcost = "30";
    this.cancost = "0";
  }

  ionViewDidLoad() {
    this.usermobile = localStorage.getItem('mobile');
    this.costselling = localStorage.getItem('cost');
    this.shoptype = localStorage.getItem('shoptype');
    this.vegetablesq = localStorage.getItem('vegetables');
    console.log(this.shoptype);
    if (this.shoptype == '0') { this.grocerry = false; this.can = true; }
    if (this.shoptype == '1') { this.grocerry = true; this.can = false; }
    if (this.shoptype == '2') { this.grocerry = true; this.can = true; }
    console.log('mobile................' + this.usermobile);
    console.log('ionViewDidLoad TimeslotPage');
    this.getdetails();
  }

  set() {
    this.Data = {
      mobile: this.usermobile,
      cost_of_can: this.costselling,
      no_of_cans_invested: this.invested,
      no_of_cans_damaged: this.damaged,
      buying: this.buying

    }
    console.log(JSON.stringify(this.Data));
    var link = 'https://www.freshcangrocery.in/sppi/product_update.php';

    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          console.log('success');
          // localStorage.setItem('cost',this.cost);
          this.presentToast('Your Water Can details are updated');
        }
        else if (this.response.status == "2") {
          console.log('success');
          // localStorage.setItem('cost',this.cost);
          this.presentToast('Your Water Can details are updated');
        }
        else {
          console.log('Failed');
          this.presentToast('Sorry, Please Try Again ')
        }
      }, error => {
        console.log("Oooops!");
      });
  }
  getdetails() {
    this.Data = {
      mobile: this.usermobile
    }
    console.log('datas....' + JSON.stringify(this.Data));
    console.log(this.Data);
    var link = 'https://www.freshcangrocery.in/sppi/get_product_info.php';
    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        // console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        console.log(this.response);
        this.costselling = this.response.can_cost;
        this.damaged = this.response.no_of_cans_damaged;
        this.invested = this.response.no_of_cans_invested;
        this.buying = this.response.buying;
        this.cancost = this.response.rental_can_cost;
        this.appcost = this.response.rental_app_cost;
        // this.buying=
      }, error => {
        console.log("Oooops!");
      });
  }
  shopproduct() {
    console.log("can", this.can);
    console.log("grocerry", this.grocerry);
    // this.can = true;
    if (this.grocerry == true || this.can == true) {
      localStorage.setItem('grocerry', 'true');
      if (this.grocerry == true && this.can == true) {
        this.product = "2";
        localStorage.setItem('can', 'true');
        localStorage.setItem('grocerry', 'true');
        localStorage.setItem('shoptype', this.product);
        this.updateshopproduct();
      }
      else if (this.can == true) {
        this.product = "0";
        localStorage.setItem('can', 'true');
        localStorage.setItem('grocerry', 'false');
        localStorage.setItem('shoptype', this.product);
        this.updateshopproduct();
      }
      else {
        this.product = "1";
        localStorage.setItem('can', 'false');
        localStorage.setItem('grocerry', 'true');
        localStorage.setItem('shoptype', this.product);
        this.updateshopproduct();
      }
    }
    else {
      this.presentToast('Please select any one the Can or Grocery or Both')
    }
  }
  updateshopproduct() {
    console.log(this.product);
    this.Data = {
      mobile: this.usermobile,
      type: this.product
    }
    console.log(JSON.stringify(this.Data));
    var link = 'https://www.freshcangrocery.in/sppi/update_shop.php';

    var myData = JSON.stringify(this.Data);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          console.log('success');
          // localStorage.setItem('cost',this.cost);
          this.presentToast('Your Shop details are added');
        }
        else if (this.response.status == "2") {
          console.log('success');
          // localStorage.setItem('cost',this.cost);
          this.presentToast('Your Shop details are updated');
        }
        else {
          console.log('Failed');
          this.presentToast('Sorry, Please Try Again ')
        }
      }, error => {
        console.log("Oooops!");
      });

  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      // duration: 3000
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
}












































