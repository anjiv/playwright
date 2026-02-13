const {test, expect} = require('@playwright/test');

// mode is used to set the mode of the test. It can be 'serial' or 'parallel'.
// serial mode is used to run the tests in serial mode. 
// Although, default mode is serial but with this if one test fails it won't run the next test.
// parallel mode is used to run the tests parallelly.
// test.describe.configure({ mode: 'serial' });
// test.describe.configure({ mode: 'parallel' });

test('playwright more examples', async ({page}) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  // await page.goto('https://google.com/');
  // await page.goBack(); // go back to the previous page.
  // await page.goForward(); // go forward to the next page.

  await expect(page.locator('#displayed-text')).toBeVisible(); // check if the element is visible.
  await page.locator('#hide-textbox').click();
  await expect(page.locator('#displayed-text')).toBeHidden(); // check if the element is hidden.

  // await page.pause(); // pause the execution of the test.
  await page.on('dialog', dialog => dialog.accept()); // accept the dialog.
  await page.locator('#confirmbtn').click();
  await page.locator('#mousehover').hover(); // hover over the element.

  const frame = await page.frameLocator('#courses-iframe'); // switch to the iframe.
  await frame.locator("li a[href*='lifetime-access']:visible").click(); // click on the element.
  const text = await frame.locator('.text h2').textContent(); // get the text content of the element.
  console.log(text.split(' ')[1]); // print the second word of the text.
});


test('screenshot testing', async ({page}) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(page.locator('#displayed-text')).toBeVisible(); // check if the element is visible.
  await page.locator('#displayed-text').screenshot({ path: 'screenshot.png' }); // screenshot the element.
  await page.locator('#hide-textbox').click();
  await page.screenshot({ path: 'screenshot2.png' }); // screenshot the page.
  await expect(page.locator('#displayed-text')).toBeHidden(); // check if the element is hidden.
});

// test('visual testing', async ({page}) => {
//   await page.goto('https://gmail.com');
//   expect(await page.screenshot()).toMatchSnapshot('landing.png');
// });