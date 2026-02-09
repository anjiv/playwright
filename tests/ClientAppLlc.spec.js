const { test, expect } = require('@playwright/test');

test('playwright task client app', async ({page}) => {
  await page.goto('https://rahulshettyacademy.com/client/');
  await page.getByPlaceholder('email@example.com').fill('anjali.vijay@axelerant.com');
  await page.getByPlaceholder('enter your passsword').fill('Learning@830$3mK2');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle'); // wait for the network to be idle so that line 18 is not required.

  // If line 14 doesn't work then we can use this.
  // await page.locator('.card-body b').first().waitFor();

  await page.locator('.card-body').filter({ hasText: 'Adidas original' }).getByRole('button', { name: 'Add To Cart' }).click();

  await page.getByRole('listitem').getByRole('button', { name: 'Cart' }).click();
  await page.locator('.cartWrap li').first().waitFor();
  await expect(page.getByText('ADIDAS ORIGINAL')).toBeVisible();

  await page.getByRole('button', { name: 'Checkout' }).click();
  // pressSequentially is used to press the keys sequentially.
  await page.getByPlaceholder('Select Country').pressSequentially('ind', { delay: 100 }); // delay is used to simulate the typing speed of the user.
  await page.getByRole('button', { name: 'India' }).nth(1).click();

  await expect(page.locator('.user__name label')).toHaveText('anjali.vijay@axelerant.com');
  await page.getByText('PLACE ORDER').click();
  await expect(page.getByText(' Thankyou for the order. ')).toBeVisible();
  const orderId = await page.locator('label.ng-star-inserted').textContent();

  await page.getByRole('button', { name: 'Orders' }).click();
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
