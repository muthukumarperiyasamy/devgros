import { Component } from '@angular/core';
import {  ToastController, NavController, NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
// import { OneSignal } from '@ionic-native/onesignal';

@Component({
  selector: 'page-otppage',
  templateUrl: 'otppage.html',
  
})
export class Otppage {
  public data: any;
  loginData: any;
  logina: FormGroup;
  main_page: { component: any };  
  public mobile: any;
  public response: any;
  public otp:any;
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public http: Http,
    public navParams: NavParams,
    // public OneSignal: OneSignal,
    
  ) {
    this.main_page = { component: TabsNavigationPage };
    
    this.logina = new FormGroup({
      otp: new FormControl('', Validators.compose([Validators.maxLength(4), Validators.required]))
    });
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad Otppage');
    this.mobile = localStorage.getItem('mobile1');
    
  }
  confirm() {
    this.loginData = {
     enteredotp: this.logina.value.otp,
     mobile: this.mobile,
    }
    console.log(name);
    var link = 'https://www.freshcangrocery.in/sppi/otp_verification.php';
    var myData = JSON.stringify(this.loginData);
    console.log(JSON.stringify(this.loginData));
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        console.log(this.response);
        if (this.response.status == "1") {
          console.log('success');
          // window["plugins"].OneSignal.sendTag('clientcode',this.response.client_code);
          this.presentToast('Thank you ! OTP Verification Completed !')
          localStorage.setItem('mobile', this.mobile);
          // /  localStorage.setItem('hasSeenTutorial', "true");
          this.navCtrl.setRoot(this.main_page.component);
        }
        else if (this.response.status == "0") {
          console.log('Failed');
          this.presentToast('Sorry ! OTP Verification Failed !')
        }
        else {
          console.log('Invalid OTP,');
          this.presentToast('Sorry !  Invalid OTP, Please check and re-enter the OTP !')
        }

      }, error => {
        console.log("Oooops!");
      });

  }
  otptoast(){
    this.presentToast('Your One Time Password for Freshcan & Grocery Shopee is 2648 !')
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Ok',
      // dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


}
