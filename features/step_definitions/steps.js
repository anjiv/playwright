const { When, Then, Given } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test');

Given('A login to Ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (username, password) {
  //js file- Login js, DashboardPage
  const products = this.page.locator('.card-body');
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(username,password);
});

When('Add {string} to the cart', async function (productName) {
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAndAddToCart(productName);
  await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
});

When('Enter valid details and Place the order', async function () {
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind","India");
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);
});

Then('Verify order is present in OrderHistory', async function () {
  await this.dashboardPage.navigateToOrders();
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(this.orderId);
  expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

Given('A login to Ecommerce2 application with {string} and {string}', async function (usernameValue, passwordValue) {
  const username = this.page.locator('#username');
  const password = this.page.locator('[type="password"]');
  const signInBtn = this.page.locator('#signInBtn');
  await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await this.page.title());
  await username.fill(usernameValue);
  await password.fill(passwordValue);
  await signInBtn.click();
});
       
Then('Verify error message is displayed', async function () {
  console.log(await this.page.locator('[style*="block"]').textContent()); // get the text content of the element with the style block
  await expect(this.page.locator('[style*="block"]')).toContainText('Incorrect');
});
