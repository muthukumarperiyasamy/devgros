import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  public item: any;
  public id: any;
  public name: any;
  public type: any;
  public description: any;
  public description1: any;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
      this.item = this.navParams.get('id');
      this.id = this.item.order_id;
      this.name = this.item.name;
      this.type = this.item.type;
      this.description1 = this.item.description;
      if(this.description1==""){
        this.description="-"
      }
      else{
        this.description=this.description1;
      }
      console.log(this.item);
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
