const { test, expect } = require('@playwright/test');

test('playwright browser basics', async ({ browser }) => {
  const context = await browser.newContext(); // new browser context i.e without any cookies or history
  const page = await context.newPage(); // new page in the browser context
  await page.goto('https://playwright.dev'); // navigate to the url
  console.log(await page.title());
});

test('playwright page basics', async({page}) => {
  const username = page.locator('#username');
  const password = page.locator('[type="password"]');
  const signInBtn = page.locator('#signInBtn');
  const cardContent = page.locator('.card-body a');
  // page.route('**/*.{png,jpg,jpeg,gif,svg}', route => route.abort()); // abort the request for the images.
  // Listen to the request and response events.
  page.on('request', request => console.log(request.url()));
  page.on('response', response => console.log(response.url(), response.status()));
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

  // Different ways to locate elements:
  // 1. By id
  await username.fill('rahulshetty'); // fill the input field with the id #id with the text 'Playwright'
  // 2. By type
  await password.fill('Learning@830$3mK2'); // fill the input field with the type password with the text 'Playwright123'
  await signInBtn.click(); // click the button with the id signInBtn
  // 3. By name
  // await page.locator('input[name="password"]').fill('Playwright123'); // fill the input field with the name password with the text 'Playwright123'
  // 4. By class
  // await page.locator('input.class').fill('Playwright123'); // fill the input field with the class class with the text 'Playwright123'
  // 5. By tag
  // await page.locator('input[tag="submit"]').click(); // click the button with the tag submit
  // 6. By text
  // await page.locator('input[text="submit"]').click(); // click the button with the text submit

  console.log(await page.locator('[style*="block"]').textContent()); // get the text content of the element with the style block
  await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
  await username.fill('');
  await username.fill('rahulshettyacademy');
  await signInBtn.click();
  console.log(await cardContent.first().textContent()); // get the text content of the first link in the card body
  // console.log(await cardContent.nth(1).textContent()); // get the text content of the second link in the card body
  console.log(await cardContent.allTextContents()); // get the text content of the all links in the card body
});

test('playwright UI components', async({page}) => {
  const username = page.locator('#username');
  const password = page.locator('[type="password"]');
  const documentLink = page.locator('[href*="documents-request"]');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await username.fill('rahulshettyacademy');
  await password.fill('Learning@830$3mK2');
  await page.locator('select.form-control').selectOption('consult');
  await page.locator('.radiotextsty').nth(1).click();
  await page.locator('#okayBtn').click();
  console.log(await page.locator('.radiotextsty').nth(1).isChecked());
  await expect(page.locator('.radiotextsty').nth(1)).toBeChecked(); // await is outside because action is performed outside the brackets.
  await page.locator('#terms').click();
  await expect(page.locator('#terms')).toBeChecked();
  await page.locator('#terms').uncheck();
  expect(await page.locator('#terms').isChecked()).toBeFalsy(); // await is inside because action is performed inside the brackets.
  await expect(documentLink).toHaveAttribute('class', 'blinkingText');
  // await page.pause();
});


test('child page handling', async({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator('#username');
  const documentLink = page.locator('[href*="documents-request"]');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const [newPage] = await Promise.all( // Promise.all is used for multiple actions at once i.e to wait for the new page to be created and the document link to be clicked.
    [
      context.waitForEvent('page'), // wait for the new page to be created.
      documentLink.click(), // click on the document link.
    ]
  );

  const text =await newPage.locator('.red').textContent();
  const domain =await text.split('@')[1].split(' ')[0]; // split the text by '@' and then split the second part by ' ' and then get the first part.
  await page.locator('#username').fill(domain);
  console.log(await page.locator('#username').inputValue()); // get the input value of the username field since it's a dynamic field so textContent is not used.
});
