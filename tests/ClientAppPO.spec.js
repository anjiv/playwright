const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
const {customTestData} = require('../utils/test-data');
// JSON -> JS string -> JS object.
const dataset = JSON.parse(JSON.stringify(require('../utils/placeholderTestData.json')));

for (const data of dataset) {
  test(`Client App login Page Object Model for ${data.productName}`, async ({page})=> {
    const poManager = new POManager(page);
    //js file- Login js, DashboardPage
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.login(data.username,data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}

customTestData(`Client App login`, async ({page,testData})=> {
  const poManager = new POManager(page);
  //js file- Login js, DashboardPage
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(testData.username,testData.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAndAddToCart(testData.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testData.productName);
  await cartPage.Checkout();
});
