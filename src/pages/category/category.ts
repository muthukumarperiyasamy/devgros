import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  public category: Array<any> = [];
  searchQuery: string = '';
  // items: string[];
  constructor(
    public navCtrl: NavController,
    public view: ViewController,
    public navParams: NavParams
  ) {
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  initializeItems(){
  this.category = ["Breads & Buns",
  "Cakes & Pastries",
  "Cookies, Rusk & Khari",
  "Dairy & Cheese",
  "Dairy",
  "Eggs",
  "Coffee",
  "Energy & Soft Drinks",
  "Fruit Juices & Drinks",
  "Health Drink, Supplement",
  "Tea",
  "Water",
  "Atta, Flours & Sooji",
  "Dals & Pulses",
  "Dry Fruits",
  "Edible Oils & Ghee",
  "Masalas & Spices",
  "Oils & Vinegar",
  "Organic Staples",
  "Rice & Rice Products",
  "Salt, Sugar & Jaggery",
  "Cuts & Sprouts",
  "Exotic Fruits & Veggies",
  "Flower Bouquets, Bunches",
  "Fresh Fruits",
  "Fresh Vegetables",
  "Herbs & Seasonings",
  "Organic Fruits & Vegetables",
  "Baby Food & Formula",
  "Cereals & Breakfast",
  "Chocolates & Biscuits",
  "Cooking & Baking Needs",
  "Pasta, Soup & Noodles",
  "Ready To Cook & Eat",
  "Snacks, Dry Fruits, Nuts",
  "Spreads, Sauces, Ketchup",
  "Tinned & Processed Food",
  "Appliances & Electricals",
  "Baby Products",
  "Bakeware",
  "Cookware & Non Stick",
  "Crockery & Cutlery",
  "Flask & Casserole",
  "Gardening",
  "Kitchen Accessories",
  "Pet Food & Accessories",
  "Steel Utensils",
  "Storage & Accessories",
  "Baby Accessories",
  "Baby Diapers & Wipes",
  "Baby Toiletries",
  "Bath, Face & Hand Wash",
  "Deodorant & Fragrance",
  "Feminine Hygiene",
  "Hair Care",
  "Health & Medicine",
  "Makeup",
  "Mens Grooming",
  "Oral Care",
  "Skin Care",
  "All Purpose Cleaners",
  "Detergents & Dishwash",
  "Disposables, Garbage Bag",
  "Fresheners & Repellents",
  "Mops, Brushes & Scrubs",
  "Pooja Needs",
  "Stationery"];
}

  dismiss(data) {
    this.view.dismiss(data);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.category = this.category.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  input(data){
    this.dismiss(data)
  }
}
