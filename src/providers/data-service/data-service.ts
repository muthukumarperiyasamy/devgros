import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class DataServiceProvider {

  cartCost: number = 0.00;
  productsData: Array<any> = [];
  product: Array<any> = [];
  userInfo: any = [];
  cartProduct: Array<[{ productName: string, "thumbnail": string, "productCode": string, "weight": number, "price": number, "item": number }]> = [];
  userCredentials: any;
  item: number = 0;
  cancount: any = 0;
  shopmobile: any;
  
  constructor(public http: Http) {
    console.log('Hello DataServiceProvider Provider');
  }


  getProducts(responed) {
    this.shopmobile = localStorage.getItem('mobile');
    console.log(this.shopmobile);
    return new Promise(resolve => {
      let Data = {
        mobile: this.shopmobile,
        category: responed,
      }
      console.log('datas....' + JSON.stringify(Data));
      var link = 'https://www.freshcangrocery.in/sppi/get_file.php';
      var myData = JSON.stringify(Data);
      this.http.post(link, myData)
        .subscribe(data => {
          this.productsData = JSON.parse(data["_body"]);
          console.log(this.productsData);
          this.product=[];
          this.productsData.forEach(element => {
            // console.log(element);
            this.product.push(element);
          });
          // console.log(this.product);
          resolve(this.productsData);
        }, err => {
          console.log(err);
        });
    });

  }

  getProductsjson() {
    return this.productsData;
  }

  // addToCart(product) {
  //   this.item++;
  //   this.cartProduct.push(product);
  //   this.cartCost += product.price * product.item;
  //   console.log(this.item);

  // }
 
  getCartProduct() {
    return this.cartProduct;
  }

  // removeCartProduct(product, cost) {
  //   this.item--;
  //   this.cartCost = cost;
  //   let index = this.cartProduct.indexOf(product);
  //   this.cartProduct.splice(index, 1);
  //   return this.cartCost = Number((this.cartCost - (product.price * product.item)).toFixed(1));
  // }

}
