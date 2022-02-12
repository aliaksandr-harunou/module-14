const BasePage = require("../basePage/basePage");
const Collection = require("../baseElements/baseCollection");
const EC = protractor.ExpectedConditions;

class MyProfilePage extends BasePage {
  constructor() {
    super();
    this.url = "https://pzz.by/cart";
    this.addedPizzas = new Collection("Added Pizzas To The Cart", ".cart-list__li");
    this.minusIcon = new Collection("Minus Icon", ".minus-item");
  };

  open() {
    return super.open(this.url);
  };

  getCountOfAddedPizzas() {
    return this.addedPizzas.getCount();
  }

  deleteFirstPizza() {
    return this.minusIcon.collection.get(0).click();
  }
};

module.exports = MyProfilePage;