const {test, expect, request} = require('@playwright/test');
const { APIutils } = require('../utils/APIutils');
// Get the payload from Network tab in browser -> Payload -> Request Payload -> View Source.
const loginPayload = {userEmail:"anjali.vijay@axelerant.com",userPassword:"Learning@830$3mK2"}; // login payload source for the API.
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}
let response;

// To test this it can be done via debug npm script. 
// Add this to the package.json file:
// "scripts": {
//   "test": "npx playwright WebAPIPart1.spec.js --headed"
// }
// Otherwise this gets skipped if done through --debug.
test.beforeAll( async () => { // before all tests are executed, we will login to the API and get the token.
  const apiContext = await request.newContext(); // new API context.
  const apiUtils = new APIutils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test('@Web Place Order Test', async ({page}) => {

  // Add the token to the localStorage of the browser.
  await page.addInitScript(value => { // init script is used to add the token to the localStorage of the browser.
    window.localStorage.setItem('token', value); // set the token to the localStorage of the window.
  }, response.token);

  await page.goto('https://rahulshettyacademy.com/client/');
  await page.locator('button[routerlink*="myorders"]').click();
  await page.locator('.table-hover tbody').waitFor();
  const rows = await page.locator('tbody tr');
  for (let i = 0; i < await rows.count(); i++) {
    const rowsOrderId = await rows.nth(i).locator('th').textContent();
    if (response.orderId.includes(rowsOrderId)) { // includes is used to check if the orderId is present in the rowsOrderId because it contains | as well in orderId.
      await rows.nth(i).locator('button.btn-primary').click(); // click the button with the class btn-primary
      break;
    }
  }

  const orderIdDetails = await page.locator('.col-text').textContent();
  await expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
