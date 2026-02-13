const { test, expect } = require('@playwright/test');

test('playwright task client app', async ({page}) => {
  const email = page.locator('#userEmail');
  const password = page.locator('#userPassword');
  const loginBtn = page.locator('#login');
  const products = page.locator('.card-body');
  const productName = 'ADIDAS ORIGINAL';

  await page.goto('https://rahulshettyacademy.com/client/');
  await email.fill('anjali.vijay@axelerant.com');
  await password.fill('Learning@830$3mK2');
  await loginBtn.click();
  await page.waitForLoadState('networkidle'); // wait for the network to be idle so that line 18 is not required.

  // If line 14 doesn't work then we can use this.
  await page.locator('.card-body b').first().waitFor();

  // Load the content of the product name
  const titles = await page.locator('.card-body b').allTextContents();
  // Instead of writing this we can load the content first so this is not required. Line 13. 
  // console.log(await productName.first().textContent());
  console.log(titles);

  const count = await products.count();
  for (let i = 0; i < count; i++) {
    const title = await products.nth(i).locator('b').textContent();
    if (title === productName) {
      await products.nth(i).locator('text= Add To Cart').click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
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
