import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ModalController, AlertController } from 'ionic-angular';
import { DataServiceProvider } from './../../providers/data-service/data-service';
import { Http } from '@angular/http';
@Component({
  selector: 'page-subcategory2',
  templateUrl: 'subcategory2.html',
})
export class Subcategory2Page {
  static notifier: number = 0;
  static show: boolean = false;
  terms: string = '';
  sortName: string = 'default';
  filterData: any;
  products: any;
  item: number = 1;
  cartProduct: any;
  modifiedCost: any;
  responed: any;
  sbcategory: any;
  loading: any;
  shopmobile: any;
  public response: any;
  constructor(public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public dataService: DataServiceProvider,
    public http: Http,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
  ) {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 5000,
      content: "Please wait..."
    });
    this.responed = this.navParams.get('category');
    this.sbcategory = this.navParams.get('sub_category');
    console.log(this.responed);
    this.cartProduct = this.dataService.getCartProduct();
    this.loading.present();
    this.dataService.getProducts(this.responed)
      .then((response) => {
        this.products = response;
        this.loading.dismiss();
        console.log(this.products);
       // console.log(this.products.length);
        
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Subcategory2Page');
    this.shopmobile = localStorage.getItem('mobile');
  }

  addProduct(product) {
    console.log(product);

    if (product.inshop === "Remove") {
      product.inshop = "Add";
      product.disabled = false;
    } else {
      product.inshop = "Remove";
      product.disabled = false;
    }
  }


  update() {
    console.log(this.products);
    let data = {
      shop_mobile: this.shopmobile,
      category: this.responed,
      grocery: this.products
    }
    console.log(data);
    var myData = JSON.stringify(data);
    var link = 'https://www.freshcangrocery.in/sppi/get_products_json.php';
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        console.log(this.response);
        if (this.response.status == "1") {
          console.log("success");
          this.presentToast(this.sbcategory + ", the latest products updated to your shop !");
        }
        else {
          console.log('shop updated Failed');
          this.presentToast('We couldn’t update, Please retry !')
        }

      }, error => {
        console.log("Oooops!");
      });
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      // duration: 1500,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
}
