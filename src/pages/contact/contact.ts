import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
// import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  public options: any;
  public website: any;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
    //  public inAppBrowser: InAppBrowser,
     private emailComposer: EmailComposer,
     public callNumber: CallNumber,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }
  call(number: string) {
    console.log(number);
      this.callNumber.callNumber(number, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
    }
    Enquiry() {
  
      let email = {
        to: 'craftsionwater@gmail.com',
        subject: 'From Fresh can user Application',
        body: "General Enquiry"
      };
      this.emailComposer.open(email);
    }
    Investors() {
      let email = {
        to: 'craftsionwater@gmail.com',
        subject: 'From Investors information',
        body: "Investors"
      };
      // Send a text message using default options
      this.emailComposer.open(email);
    }
    addshop() {
      let email = {
        to: 'craftsionwater@gmail.com',
        subject: 'For Add shop in Fresh Can ',
        body: "Welcome to Fresh Can"
      };
      // Send a text message using default options
      this.emailComposer.open(email);
    }
  //   InAppBrowser() {
  //     this.options = {
  //       location: 'yes',//Or 'no' 
  //       zoom: 'yes',//Android only ,shows browser zoom controls 
  //     }
  //     this.website = "https://www.gwcindia.in/ContactUs";
  //     this.inAppBrowser.create(this.website, this.options);
  //   }
  //   openInAppBrowser(website: string) {
  //     console.log(website);
  
  //     this.inAppBrowser.create(website, '_blank', "location=yes");
  //   }
}
