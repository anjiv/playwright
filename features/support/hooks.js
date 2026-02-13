const { chromium } = require('playwright');
const {POManager} = require('../../pageobjects/POManager');
const { Before, After, AfterStep, Status } = require('@cucumber/cucumber');

// Runs before each scenario.
Before(async function () {
  const browser = await chromium.launch({headless: false}); // headless: false is used to see the browser in the screen.
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});

// Runs after each scenario.
// After(function () {
//   console.log("I am last to execute");
// });

// Runs after all scenarios.
// AfterAll(function () {
//   console.log("I am last to execute");
// });

// Runs before all scenarios.
// BeforeAll(function () {
//   console.log("I am first to execute");
// });

// Runs after each step.
// AfterStep(async function ({result}) {
//   if (result.status === Status.FAILED) {
//     await this.page.screenshot({path: 'screenshot_failed.png'});
//   }
// });

// Runs before each step.
// BeforeStep(function () {
//   console.log("I am before each step");
// });
