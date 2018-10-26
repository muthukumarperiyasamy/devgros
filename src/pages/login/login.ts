import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { Http } from '@angular/http';
// import { OneSignal } from '@ionic-native/onesignal';


@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: FormGroup;
  main_page: { component: any };
  loading: any;
  loginData: any;
  public response: any;
  public togglex: string;

  constructor(
    public nav: NavController,
    public http: Http,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    // public OneSignal: OneSignal

  ) {
    this.main_page = { component: TabsNavigationPage };

    this.login = new FormGroup({
      // mobile: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.required])),
      password: new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  doLogin(loginData) {
    this.loginData = { mobile: this.login.value.mobile, password: this.login.value.password };
    var link = 'https://www.freshcangrocery.in/sppi/login.php';
    console.log(JSON.stringify(this.loginData));
    var myData = JSON.stringify(this.loginData);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.response = JSON.parse(data["_body"]);
        if (this.response.result == "1") {
          console.log('success');
          localStorage.setItem('mobile', this.login.value.mobile);
          localStorage.setItem('username', this.response.name);
          localStorage.setItem('togglex', this.response.availability);
          localStorage.setItem('shoptype', this.response.shop_type);
          window["plugins"].OneSignal.sendTag('type', "Shop");
          window["plugins"].OneSignal.sendTag('mobile', this.login.value.mobile);
          this.nav.setRoot(this.main_page.component);
        }

        else {
          console.log('Failed');
          this.presentToast('Sorry, There was an error with your Mobile No / Password. Please try again.')
        }
      }, error => {
        console.log("Oooops!");
      });
  }

  goToSignup() {
    this.nav.push(SignupPage);
  }

  goToForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      // duration: 3000,
      closeButtonText: 'Ok',
      position: 'bottom',
      showCloseButton: true,
       // dismissOnPageChange: true,
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
}
