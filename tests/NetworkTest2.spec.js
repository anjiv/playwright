const { test, expect } = require('@playwright/test');

test('@Web Security test request intercept', async ({ page }) => {
  //login and reach orders page
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("anjali.vijay@axelerant.com");
  await page.locator("#userPassword").fill("Learning@830$3mK2");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();

  await page.locator("button[routerlink*='myorders']").click();
  // Intercept the API request and return a fake response.
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})
