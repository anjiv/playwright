// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  workers: 1, // How many multiple browsers to run the tests on when executing in parallel. It can be 1, 2, 3, etc. Default is 5.
  // A test which fails in run but passes in retry is called a flaky test.
  retries: 1, // retries is used to set the number of retries for the test. It can be 0, 1, 2, 3, etc.
  timeout: 30000, // global timeout for all tests
  expect: {
    timeout: 5000, // timeout for each expect statement
  },
  reporter: [['html']],
  // reporter: [
  //   ['line'], // Optional: Keeps the default line output in the terminal
  //   ['allure-playwright', {
  //   resultsDir: 'allure-results', // Optional: Specifies where results will be saved
  // }]],
  // projects is used to run the tests on multiple browsers.
  // projects: [
  //   {
  //     // run - npx playwright test test.js --project=safari
  //     name: 'safari',
  //     use: {
  //       browserName: 'webkit',
  //       headless: true,
  //       screenshot: 'off',
  //       trace: 'retain-on-failure',
  //       // viewport: { width: 1200, height: 720 }, // viewport is used to set the viewport size of the browser.
  //       ...devices['iPhone 13'], // devices is used to set which device to use for testing.
  //       ignoreHTTPSErrors: true, // ignore HTTPS errors like SSL certificate errors.
  //       permissions: ['geolocation'], // permissions is used to grant permissions to the browser. Example: geolocation, camera, microphone, etc.
  //       video: 'retain-on-failure', // video is used to record the video of the test. It can be 'on', 'off', 'retain-on-failure', 'on-first-retry'.
  //     },
  //   }, {
  //     // run - npx playwright test test.js --project=chrome
  //     name: 'chrome',
  //     use: {
  //       browserName: 'chromium',
  //       headless: false,
  //       /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  //       screenshot: 'on', // or 'only-on-failure' to take screenshot only on failure.
  //       trace: 'retain-on-failure', // retain the trace on failure so that we can see the trace of the failed test.
  //       ...devices['Samsung Galaxy S20'], // devices is used to set which device to use for testing.
  //     },
  //   }
  // ],
  use: {
    browserName : 'chromium',
    headless : true,
    screenshot : 'only-on-failure',
    trace : 'retain-on-failure',
  },
});
