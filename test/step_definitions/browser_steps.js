const {Given,When,Then,setDefaultTimeout} = require('@cucumber/cucumber');
const {browser} = require('protractor');
const {expect} = require('chai');
const PageFactory = require("../po/pageFactory");
const homePage = PageFactory.getPage("Home");
const cartPage = PageFactory.getPage("Cart");
const pizzaPage = PageFactory.getPage("Pizza");
const EC = protractor.ExpectedConditions;
setDefaultTimeout(60000);

Given('I open pzz.by', function () {
    return homePage.open();
});

When('I select {string}', function (string) {
    return homePage.pizzaSection.clickElementByText(string);
});

When('I choose {string} pizza size', function (pizzaSize) {
    if (pizzaSize === "Стандартная") {
        return pizzaPage.sizes.collection.get(1).click();
    } else if (pizzaSize === "Тонкое тесто 36 см") {
        return pizzaPage.sizes.collection.get(2).click();
    } else if (pizzaSize === "Большая") {
        return pizzaPage.sizes.collection.get(0).click();
    } else {
        throw new Error("Invalid Pizza size is specified");
    }

});

When('I move current pizza to the cart', function () {
    return pizzaPage.clickOnMoveToCartButton();
});

When('I choose {string} delivery mode', function (string) {
    return pizzaPage.deliveryModes.clickElementByText(string);
});

When('I choose {string} address', function (string) {
    return pizzaPage.addresseOfPickups.clickElementByText(string);
});

When('I navigate to {string} using navigation menu', function (navigationLinkName) {
    return homePage.Header.navigationLinks.clickElementByText(navigationLinkName);
});

When('I open cart', function () {
    return cartPage.open();
});

When("I wait {int} seconds", function (int) {
    return browser.sleep(int * 1000);
});

When("I close current pizza page", function () {
    return pizzaPage.closePizzaPage();
});

When("I delete first pizza from the cart", function () {
    return cartPage.deleteFirstPizza();
});

Then("Count of selected pizza should be equal to {int}", async function (expectedCount) {
    let actualCount = await cartPage.getCountOfAddedPizzas();
    expect(expectedCount).to.be.equal(actualCount);
});

Then("Page title should be {string}", async function (expectedTitle) {
    const actualTitle = await browser.getTitle();
    expect(expectedTitle).to.be.equal(actualTitle);
});

When("I wait until pizza sizes are visible", function () {
    const firstAvailableSize = pizzaPage.sizes.collection.get(0);
    return browser.wait(EC.visibilityOf(firstAvailableSize), 3000);
});

When("I wait until addresses are visible", function () {
    const secondAvailableAddress = pizzaPage.addresseOfPickups.collection.get(1);
    return browser.wait(EC.visibilityOf(secondAvailableAddress), 3000);
});

When("I wait first pizza addresses are visible", function () {
    const fistPizza = homePage.pizzaSection.collection.get(3);
    return browser.wait(EC.visibilityOf(fistPizza), 3000);
});


When("I wait until {string} is visible", async function (pizzaName) {
    const arrayOfElementTexts = await homePage.pizzaSection.collection.getText();
    const elementToClickIndex = arrayOfElementTexts.indexOf(pizzaName);
        if (elementToClickIndex === -1) {
            throw new Error(`No pizza with name [${textToClick}] found!`);
        }
    const pizza = homePage.pizzaSection.collection.get(elementToClickIndex);
    return browser.wait(EC.visibilityOf(pizza), 3000);
});