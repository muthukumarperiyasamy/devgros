import { Component } from '@angular/core';
import { NavController, ModalController, ToastController , LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { Otppage } from '../otppage/otppage';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: FormGroup;
  main_page: { component: any };
  loading: any;
  signupData: any;
  public response: any;
  duration: number = 6000;
  tooltipEvent: 'press' | 'click' = 'click';
  showArrow: boolean = true;
  
  constructor(
    public nav: NavController,
    public toastCtrl: ToastController,
    public http: Http,
    public modal: ModalController,
    public loadingCtrl: LoadingController
  ) {
    this.main_page = { component: TabsNavigationPage };

    this.signup = new FormGroup({
      name: new FormControl('', Validators.required),
      mobileno: new FormControl('', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.required])),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required])),
      referal: new FormControl('',),
      address: new FormControl('', Validators.required),
      // shopno: new FormControl('', Validators.required),
    });
  }

  doSignup(){

    this.signupData = {
      name: this.signup.value.name,
      mobile: this.signup.value.mobileno,
      referral: this.signup.value.referal,
      email: this.signup.value.email,
      password: this.signup.value.password,
      shop_address: this.signup.value.address,
      // shop_mobileno: this.signup.value.shopno,
    };
    console.log(this.signupData);
    var link = 'https://www.freshcangrocery.in/sppi/admin_register.php';
    var myData = JSON.stringify(this.signupData);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        data["_body"];
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          console.log('success');
          this.presentToast('Signup Success')
          window["plugins"].OneSignal.sendTag('type',"Shop");
          window["plugins"].OneSignal.sendTag('mobile', this.signup.value.mobileno);
          localStorage.setItem('mobile', this.signup.value.mobileno);
          localStorage.setItem('username', this.signup.value.name);
          localStorage.setItem('togglex', "true");
          localStorage.setItem('shoptype', '0');
          this.nav.push(Otppage);
        }
        else if (this.response.status == "-1") {
          console.log('Failed');
          this.presentToast('This Mobile No already registered with us, If needed you can reset password.')
        }
        else {
          console.log('already exist');
          this.presentToast('There was an error, Signup Failed ! please try after sometime.')

        }
      }, error => {
        console.log("Oooops!");
      });
    
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
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

 

  showTermsModal() {
    let modal = this.modal.create(TermsOfServicePage);
    modal.present();
  }

  showPrivacyModal() {
    let modal = this.modal.create(PrivacyPolicyPage);
    modal.present();
  }

}
