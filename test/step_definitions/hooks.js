const { After, Status } = require('@cucumber/cucumber');
const { browser } = require('protractor');


After(async function (testCase) {
    if (testCase.result.status === Status.FAILED) {
        const screenshot = await browser.takeScreenshot();
        const decodedImage = new Buffer.from(screenshot, 'base64');
        return this.attach(decodedImage, 'image/png'); 
    }    
});