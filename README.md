# Playwright Automation Project

Automation framework built with **Playwright** for UI, API, and BDD (Cucumber) tests. It uses the Page Object Model and supports both JavaScript and TypeScript.

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

## Installation

```bash
npm init playwright@latest
```

## Project Structure

```
playwright/
├── playwright.config.js      # Playwright test configuration
├── package.json
├── features/                  # Cucumber BDD
│   ├── Ecommerce.feature
│   ├── ErrorValidations.feature
│   ├── step_definitions/
│   │   └── steps.js
│   └── support/
│       └── hooks.js           # Before/After, browser setup for Cucumber
├── tests/                     # Playwright test specs
│   ├── ClientApp.spec.js      # E2E client app (no POM)
│   ├── ClientAppPO.spec.js    # E2E with Page Objects (JS)
│   ├── ClientAppPO.spec.ts    # E2E with Page Objects (TS) + data-driven
│   ├── MoreExamples.spec.js   # Visibility, dialogs, iframes, screenshots
│   ├── NetworkTest.spec.js    # API + request context
│   ├── upload-download-excel.spec.js
│   └── ...                    # Other specs (UI, API, calendar, etc.)
├── pageobjects/               # Page Objects (JavaScript)
│   ├── POManager.js
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── CartPage.js
│   ├── OrdersReviewPage.js
│   └── OrdersHistoryPage.js
├── pageobjects_ts/            # Page Objects (TypeScript)
│   ├── POManager.ts
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── CartPage.ts
│   ├── OrdersReviewPage.ts
│   └── OrdersHistoryPage.ts
├── utils/                     # Utilities (JS)
│   ├── APIutils.js            # API login, create order, token
│   ├── placeholderTestData.json
│   └── test-data.js
├── utils_ts/                  # Utilities (TS)
│   ├── test-data.ts           # customTest fixture, TestData
│   ├── placeholderTestData.json
│   └── APIutils.ts
├── cucumber-report.html       # Cucumber HTML report (generated)
├── playwright-report/         # Playwright HTML report (generated)
└── test-results/              # Test artifacts (generated)
```

## Running Tests

### Playwright tests

| Command | Description |
|--------|-------------|
| `npx playwright test` | Run all tests (default) |
| `npx playwright test tests/ClientAppPO.spec.ts` | Run a specific file |
| `npx playwright test --headed` | Run with browser visible |
| `npx playwright test --debug` | Run in debug mode |
| `npx playwright show-report` | Open last HTML report |

### Cucumber (BDD) tests

| Command | Description |
|--------|-------------|
| `npx cucumber-js --tags "@Regression" - -retry 1 --format html:cucumber-report.html --exit` | Run scenarios tagged `@Regression`, retry 1, HTML report |
| `npx cucumber-js` | Run all feature files |
| `npx cucumber-js --tags '@Regression'` | Run only `@Regression` scenarios |
| `npx cucumber-js --format html:cucumber-report.html` | Generate HTML report |

Cucumber report is written to `cucumber-report.html`.

## Configuration

- **Config file:** `playwright.config.js`
- **Test directory:** `./tests`
- **Workers:** 1 (no parallel workers by default)
- **Retries:** 1
- **Timeout:** 30s (global), 5s for `expect`
- **Browser:** Chromium, headless
- **Artifacts:** Screenshot on failure, trace on failure

You can switch to multiple projects (e.g. Safari, Chrome with devices) by uncommenting the `projects` block in the config.

## Test Types

### 1. Playwright specs (tests/)

- **ClientApp.spec.js** – Full e-commerce flow (login → add to cart → checkout → order history) using raw locators.
- **ClientAppPO.spec.js / ClientAppPO.spec.ts** – Same flow using Page Object Model; TS version uses JSON/test-data for data-driven runs.
- **MoreExamples.spec.js** – Visibility, dialogs, iframes, element/page screenshots.
- **NetworkTest.spec.js** – API context: login, create order, token usage.
- **upload-download-excel.spec.js** – Download file, edit with ExcelJS, upload and assert.
- Other specs cover UI basics, calendar, Web API, etc.

### 2. Cucumber BDD (features/)

- **Ecommerce.feature** – Tagged `@Regression`: login, add product to cart, checkout, verify order in history.
- **ErrorValidations.feature** – Tagged `@Validation`: login page error message with scenario outline (multiple username/password pairs).

Step definitions and shared setup (browser, page, POManager) live in `features/step_definitions/steps.js` and `features/support/hooks.js`. Hooks launch Chromium and create `page` and `poManager` on the Cucumber world (`this`).

## Page Object Model

- **POManager** creates and holds all page objects (Login, Dashboard, Cart, OrdersReview, OrdersHistory) and is initialized with a Playwright `page`.
- Both **JavaScript** (`pageobjects/`) and **TypeScript** (`pageobjects_ts/`) implementations exist; Cucumber uses the JS POM, TS specs use `pageobjects_ts`.
- **LoginPage** – goto client URL, fill credentials, submit.
- **DashboardPage** – search product, add to cart, navigate to cart/orders.
- **CartPage** – verify product, checkout.
- **OrdersReviewPage** – country search/select, submit and get order ID.
- **OrdersHistoryPage** – search order by ID, get order ID text.

## Utilities

- **utils/APIutils.js** – Login via API, get token, create order (used in API/e2e tests).
- **utils_ts/test-data.ts** – `customTest` fixture with `testData` (username, password, productName) for parameterized tests.
- **placeholderTestData.json** – Array of `{ username, password, productName }` for data-driven specs.
- **ExcelJS** – Used in upload-download-excel spec to read/update Excel and validate on the page.

## Reports

- **Playwright:** `npx playwright show-report` opens `playwright-report/index.html` (after a run).
- **Cucumber:** `cucumber-report.html` is generated when using `--format html:cucumber-report.html` (e.g. via `cucumberRegression` script).

## Dependencies

- **@playwright/test** – Test runner and browser automation
- **@cucumber/cucumber** – BDD execution
- **exceljs** – Excel read/write in upload-download test
- **allure-playwright** (dev) – Optional Allure reporter (commented in config)
- **typescript**, **@types/node** (dev) – For TypeScript specs and page objects

## Applications Under Test

- **Client app:** `https://rahulshettyacademy.com/client`
- **Login practise:** `https://rahulshettyacademy.com/loginpagePractise/`
- **Automation practice:** `https://rahulshettyacademy.com/AutomationPractice/`
- **Upload/Download:** `https://rahulshettyacademy.com/upload-download-test/index.html`
- **API:** `https://rahulshettyacademy.com/api/ecom/...`

Replace credentials and test data as needed for your environment; avoid committing real secrets.
