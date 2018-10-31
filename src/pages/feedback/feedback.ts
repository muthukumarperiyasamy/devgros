import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams,ModalController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { CommentsPage } from '../comments/comments';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  public loading: any;
  public searchQuery: string = '';
  public items: string[];
  public feedback: Array<any> = [];
  public copyfeedback: Array<any> = [];
  public Data: any;
  public usermobile: any;
  public response: any;
  constructor(public navCtrl: NavController,
    public http: Http,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 5000,
      content: "Loading...",
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
    this.usermobile = localStorage.getItem('mobile');
    // this.initializeItems();
    this.getfeedback()
  }
  initializeItems() {
    this.feedback = [
      { "mobile": "45632149", "name": "oest1", "order_id": "9247811", "opinion": "delivered", "comments": "delivery is fine" },
      { "mobile": "7568943219", "name": "rest1", "order_id": "9247811", "opinion": "delivered", "comments": "delivery is fine" },
      { "mobile": "745968319", "name": "test1", "order_id": "9247811", "opinion": "delivered", "comments": "delivery is fine" },
      { "mobile": "735216949", "name": "test1", "order_id": "9247811", "opinion": "delivered", "comments": "delivery is fine" },
      { "mobile": "5613278949", "name": "hest1", "order_id": "9247811", "opinion": "delivered", "comments": "delivery is fine" },
      { "mobile": "6327894519", "name": "sest1", "order_id": "9247811", "opinion": "delivered", "comments": "delivery is fine" }
    ];
    this.copyfeedback = this.feedback;
    console.log(this.feedback);
  }
  getfeedback() {
    this.Data = {
      // mobile: '7894563211'
      mobile: this.usermobile
    };
    var link = 'https://www.freshcangrocery.in/sppi/getFeedback.php';
    var myData = JSON.stringify(this.Data);
    this.loading.present();
    this.http.post(link, myData)
      .subscribe(data => {
        // console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        console.log(this.response);
        if (this.response != "") {
          this.response.forEach(element => {
            this.feedback.push(element);
            console.log(element.type);
          });
          this.copyfeedback = this.feedback;
        }
        this.loading.dismiss();
      }, error => {
        console.log("Oooops!");
      });
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;
    this.feedback = this.copyfeedback;
    if (!val) {
      return;
    }
    // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    this.feedback = this.feedback.filter((item) => {

      if (item.name && val) {
        if (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
      }
      if (item.mobile && val) {
        if (item.mobile.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
      }
      // return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
    // }
  }
  nextpage(item) {
    // if (item.description !='') {
      var modal = this.modalCtrl.create(CommentsPage, { id: item });
      modal.present();
      modal.onDidDismiss((data) => {
      });
  //  }
  }
  showAlert(msg) {
    const alert = this.alertCtrl.create({
      // title: 'description!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
}
