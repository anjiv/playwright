import {Page, Locator} from '@playwright/test';

export class LoginPage {
  page: Page;
  username: Locator;
  password: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
    this.loginButton = page.locator('[value="Login"]');
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/client');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { LoginPage };
