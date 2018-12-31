import { Component, ViewChild } from '@angular/core';
import { NavController, App, NavParams, AlertController, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { CategoryPage } from '../category/category';
import { Slides } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AddweightPage } from '../addweight/addweight';

@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage {

  @ViewChild('slides') slides: Slides;

  base64Image: any;
  imageURL: any;
  alert: any
  public response: any;
  public subcategory: any;
  public usermobile: any;
  public productname: any;
  public producttype: any;
  public weight: any = "unit/packet";
  public spprice: any ;
  public mrp: any ;
  public volume: any;
  currentIndex = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public camera: Camera,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private transfer: FileTransfer,
    public actionSheetCtrl: ActionSheetController
  ) {

  }

  //******************************************----------------call the ionviewdidload------------------************************************

  ionViewDidLoad() {
    this.usermobile = localStorage.getItem('mobile');
    console.log('ionViewDidLoad AddproductPage');
    this.productname = "";
    this.weight = "";
    this.volume =[];
    this.base64Image = "";
    this.subcategory = "";
    this.mrp = "";
    this.spprice = "";
   
    console.log(this.productname);
    console.log(this.weight);
    console.log(this.volume);
    console.log(this.base64Image);
    console.log(this.subcategory);
    console.log(this.mrp);
    console.log(this.spprice);
    
  }


  // product(name, name1) {
  //   this.presentToast(' Your click category ' + name1)
  //   this.subcategory = name1
  // }

  //******************************************----------------call the Upload details to database------------------************************************
  update() {
    if (this.volume == "") {
      let discount = ((this.mrp - this.spprice) * 100) / this.mrp;
      discount = Math.round(discount) //  6
      let data = [{
        weight: "1 "+this.weight,
        mrp_price: this.mrp,
        price: this.spprice,
        discount: discount
      }]
      this.volume = data
      console.log(this.volume);
      
    }
    console.log(this.productname);
    console.log(this.weight);
    console.log(this.volume);
    console.log(this.subcategory);
    this.upload();
  }

  //******************************************----------------Access the gallary to Upload image------------------************************************
  accessGallery() {
    console.log('ingallery');

    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetHeight: 600,
      targetWidth: 600,
      allowEdit: true
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      // console.log(this.base64Image);
    }, (err) => {
      console.log('error' + err);
    });
  }

  //******************************************----------------Access the Camera to Upload image------------------************************************
  takePhoto() {
    console.log('in camera');

    // this.camera.getPicture({
    //   targetHeight: 600,
    //   targetWidth: 600,
    //   allowEdit: true
    // }).then((imageData) => {
    //   this.base64Image = imageData
    const options: CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 600,
      targetWidth: 600,
      allowEdit: true
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log('error' + err);
    });
  }
  //******************************************----------------ActionSheet to Upload image------------------************************************

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Image Upload',
      buttons: [
        {
          text: 'From Gallery',
          role: 'destructive',
          icon: 'image',
          handler: () => {
            console.log('Destructive clicked');
            this.accessGallery();
          }
        }, {
          text: 'Take Photo',
          icon: 'camera',
          handler: () => {
            console.log('Archive clicked');
            this.takePhoto();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  //******************************************----------------Modal Page for category -----------------************************************
  category() {
    var modal = this.modalCtrl.create(CategoryPage);
    modal.present();
    modal.onDidDismiss((data) => {
      console.log(data);
      this.subcategory = data;
      console.log(this.subcategory);
    });
  }
  //******************************************----------------Modal Page for addweight -----------------************************************
  addweight() {
    let data = {
      category: this.subcategory,
      volume:this.volume
    }
    if (this.subcategory != "") {
      var modal = this.modalCtrl.create(AddweightPage, data);
      modal.present();
      modal.onDidDismiss((data) => {
        console.log(data);
        if (data == undefined) {
          this.volume = [];
        } else {
          this.volume = data;
        } console.log(this.volume);
      });
    }
    else {
      this.presentToast('Please select  Category');
    }
  }
  //******************************************----------------UPload details for Database -----------------************************************
  upload() {
    // var rand = Math.floor(Math.random() * 20) + 1;
    const fileTransfer: FileTransferObject = this.transfer.create();
    var url = 'https://www.freshcangrocery.in/sppi/product_upload.php';
    var imge = this.base64Image;
    // console.log(imge);
    let product_name1 = this.productname;
    let product_type1 = this.weight;
    let product_weight1 = this.volume;
    let subcategory1 = this.subcategory;
    let usermobile1 = this.usermobile;

    var options = {
      fileKey: 'file',
      fileName: this.productname + '.jpg',
      mimeType: "image/jpg",
      headers: {},
      params: {
        product_name: product_name1,
        product_type: product_type1,
        product_weight: product_weight1,
        sub_category: subcategory1,
        main_category: 'new_product',
        mobile: usermobile1,
        disabled: false
      }
    };
    console.log(options);
    fileTransfer.upload(imge, url, options).then((results) => {
      console.log(results.response);
      this.response = JSON.parse(results.response);
      console.log(this.response);
      // console.log(
      this.response = 1;
      // );
      if (this.response == "1") {
        this.presentToast('Your Product added Successfully and will be available in 1 hour');
        this.showConfirm();
      }
      else {
        console.log('already exist');
        this.presentToast('We couldn’t add your products, Please retry !')

      }
    }, error => {
    });
    (err) => {
      let alert = this.alert.create({
        title: 'Warning',
        subTitle: "ERROR",
        buttons: ['OK']
      })
      alert.present();
    };
  }

  //******************************************----------------Divert to home page -----------------************************************
  homepage() {
    this.app.getRootNav().setRoot(HomePage);
  }

  //******************************************----------------ALert sheet for adding New product-----------------************************************
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Again Add New product',
      message: 'Do you want to Add New product again! ',
      buttons: [
        {
          text: 'To Home Page',
          handler: () => {
            this.homepage()
          }
        },
        {
          text: 'Add New',
          handler: () => {
            console.log('purchasecan confirmed');
            this.ionViewDidLoad();
          }
        }
      ]
    });
    confirm.present();
  }

  //******************************************----------------Toast Message adding New product-----------------************************************
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      closeButtonText: 'Ok',
      position: 'bottom',
      // dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}