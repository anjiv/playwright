const { test, expect } = require('@playwright/test');
let webContext;

// This test is to login to the client app and save the state of the browser to the state.json file.
// So that we can have the state of the browser saved and we can use it in the other tests.
test.beforeAll( async ({browser}) => {
  const context = await browser.newContext(); // new API context.
  const page = await context.newPage(); // new page in the browser context.
  const email = page.locator('#userEmail');
  const password = page.locator('#userPassword');
  const loginBtn = page.locator('#login');

  await page.goto('https://rahulshettyacademy.com/client/');
  await email.fill('anjali.vijay@axelerant.com');
  await password.fill('Learning@830$3mK2');
  await loginBtn.click();
  await page.waitForLoadState('networkidle');
  await context.storageState({ path: 'state.json' }); // save the state of the browser to the state.json file.
  webContext = await browser.newContext({ storageState: 'state.json' }); // new context with the state of the browser.
});

test('playwright task client app', async () => {

  const productName = 'ADIDAS ORIGINAL';
  const page = await webContext.newPage();
  const products = page.locator('.card-body');
  await page.goto('https://rahulshettyacademy.com/client/');

  const count = await products.count();
  for (let i = 0; i < count; i++) {
    const title = await products.nth(i).locator('b').textContent();
    if (title === productName) {
      await products.nth(i).locator('text= Add To Cart').click();
      break;
    }
  }

  await page.locator('[routerlink*="cart"]').click();
  await page.locator('.cartWrap li').first().waitFor();
  const bool =await page.locator('h3:has-text("ADIDAS ORIGINAL")').isVisible();
  await expect(bool).toBeTruthy();

  await page.locator('text=Checkout').click();
  // pressSequentially is used to press the keys sequentially.
  await page.locator('[placeholder*="Country"]').pressSequentially('ind', { delay: 100 }); // delay is used to simulate the typing speed of the user.
  const dropdown = page.locator('.ta-results');
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator('button').count();
  for (let i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator('button').nth(i).textContent();
    if (text === ' India') {
      await dropdown.locator('button').nth(i).click();
      break;
    }
  }
  await expect(page.locator('.user__name label')).toHaveText('anjali.vijay@axelerant.com');
  await page.locator('.action__submit').click();
  await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
  const orderId = await page.locator('label.ng-star-inserted').textContent();

  await page.locator('button[routerlink*="myorders"]').click();
  await page.locator('.table-hover tbody').waitFor();
  const rows = await page.locator('tbody tr');
  for (let i = 0; i < await rows.count(); i++) {
    const rowsOrderId = await rows.nth(i).locator('th').textContent();
    if (orderId.includes(rowsOrderId)) { // includes is used to check if the orderId is present in the rowsOrderId because it contains | as well in orderId.
      await rows.nth(i).locator('button.btn-primary').click(); // click the button with the class btn-primary
      break;
    }
  }

  const orderIdDetails = await page.locator('.col-text').textContent();
  await expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

// This test is to check if the titles are loaded correctly. And it doesn't require to login again.
test('Test 2 for titles', async () => {
  const productName = 'ADIDAS ORIGINAL';
  const page = await webContext.newPage();
  const products = page.locator('.card-body');
  await page.goto('https://rahulshettyacademy.com/client/');
  await page.waitForLoadState('networkidle');
  // Load the content of the product name
  const titles = await page.locator('.card-body b').allTextContents();
  // Instead of writing this we can load the content first so this is not required. Line 13. 
  // console.log(await productName.first().textContent());
  console.log(titles);
});
