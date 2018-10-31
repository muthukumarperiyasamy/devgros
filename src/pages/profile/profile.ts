import { Component } from '@angular/core';
import { NavController, ModalController,SegmentButton, LoadingController, ToastController } from 'ionic-angular';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { WalkthroughPage } from '../walkthrough/walkthrough';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  loading: any;
  section: string;
  public name: any;
  public usernum: any;
  public email: any;
  public password: any;
  public address: any;
  public landmark: any;
  public shopnum: any;
  public updatedata: any;
  public list: any;
  public profile: Array<any> = [];
  public getdata: any;
  public usermobile: any;
  public response: any;
  public toggle: boolean = true;
 
 
  public old:any;
  public new:any;
  public new1:any;
  public response1: any;
  public Data: any;
  constructor(
    public nav: NavController,
    public modal: ModalController,
    public toastCtrl: ToastController,
    public http: Http,
    public loadingCtrl: LoadingController,

  ) {
    this.section = "profile";
  }
  onSegmentChanged(segmentButton: SegmentButton) {
    console.log('Segment changed to', segmentButton.value);
  }
  onSegmentSelected(segmentButton: SegmentButton) {
  }
  ionViewDidLoad() {
    this.usermobile = localStorage.getItem('mobile');
    this.getprofile();
  }

  logout() {
    // navigate to the new page if it is not the current page
    this.nav.setRoot(WalkthroughPage);
    localStorage.removeItem('mobile');
    localStorage.clear();
  }

  showTermsModal() {
    let modal = this.modal.create(TermsOfServicePage);
    modal.present();
  }

  showPrivacyModal() {
    let modal = this.modal.create(PrivacyPolicyPage);
    modal.present();
  }

  getprofile() {
    this.getdata = {
      mobile: this.usermobile,
    }
    console.log('datas....' + JSON.stringify(this.getdata));
    var link = 'https://www.freshcangrocery.in/sppi/getprofile.php';
    var myData = JSON.stringify(this.getdata);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        this.list = JSON.parse(data["_body"]);
        console.log(this.list);
        this.name = this.list.name;
        localStorage.setItem('username', this.name);
        this.usernum = this.list.mobile;
        this.email = this.list.email;
        //  this.password= this.list.password;
        this.address = this.list.shop_address;
        // this.landmark = this.list.landmark;
        this.shopnum = this.list.shop_mobileno;

      }, error => {
        console.log("Oooops!");
      });
  }
  profileupdate() {
    this.updatedata = {
      // name: this.name,
      mobile: this.usernum,
      // landmark: this.landmark,
      // email: this.email,
      shop_address: this.address,
      // shop_mobileno: this.shopnum,
    };
    var link = 'https://www.freshcangrocery.in/sppi/updateProfile.php';
    var myData = JSON.stringify(this.updatedata);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        // data["_body"];
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
          console.log("success");
          this.presentToast("Profile Updated successfully");
        }
        else {
          console.log('Profile updated Failed');
          this.presentToast('Sorry. Please Try Again.')

        }
      }, error => {
        console.log("Oooops!");
      });
    console.log(this.updatedata);
  }
  passwordupdate() {
    this.Data = {
      mobile: this.usermobile,
      currentpassword: this.old,
      enteredpassword: this.new,
      confirmedpassword: this.new1,
    };
    // var link = 'https://kumar932486.000webhostapp.com/can2.0/shop_admin/changepwd.php';
    var link = 'https://www.freshcangrocery.in/sppi/changepwd.php';
    var myData = JSON.stringify(this.Data);
    console.log(myData);
    this.http.post(link, myData)
      .subscribe(data => {
        console.log(data["_body"]);
        data["_body"];
        this.response = JSON.parse(data["_body"]);
        if (this.response.status == "1") {
        console.log("success");        
          this.presentToast("Your new password updated, please logout and login again.");
        }
        else {
          console.log('Password updated Failed');
          this.presentToast('We are unable to update your password ! Please retry.')

        }
      }, error => {
        console.log("Oooops!");
      });
   
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      // duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  notify() {
    console.log(this.toggle);
  }
}
