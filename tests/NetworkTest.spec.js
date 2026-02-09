const {test, expect, request} = require('@playwright/test');
const { APIutils } = require('../utils/APIutils');
// Get the payload from Network tab in browser -> Payload -> Request Payload -> View Source.
const loginPayload = {userEmail:"anjali.vijay@axelerant.com",userPassword:"Learning@830$3mK2"}; // login payload source for the API.
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}
let response;
let fakeResponse = {message: 'No orders'}; // JS object.

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

test('Place Order Test', async ({page}) => {

  // Add the token to the localStorage of the browser.
  await page.addInitScript(value => { // init script is used to add the token to the localStorage of the browser.
    window.localStorage.setItem('token', value); // set the token to the localStorage of the window.
  }, response.token);

  await page.goto('https://rahulshettyacademy.com/client/');

  await page.route('https://rahulshettyacademy.com/api/ecom/user/get-cart-count/*', async route => {
    const response = await page.request.fetch(route.request());
    let body = JSON.stringify(fakeResponse); // convert the fake response to JSON string.
    route.fulfill({
      response,
      body
    });
    //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
  });

  // Fake response needs to be made before the click is performed on button.
  await page.locator('button[routerlink*="myorders"]').click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
  // console.log(await page.locator(".mt-4").textContent());
});
