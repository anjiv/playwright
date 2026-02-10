import {Page, Locator} from '@playwright/test';

export class DashboardPage {
  page: Page;
  products: Locator;
  productsText: Locator;
  cart: Locator;
  orders: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.productsText = page.locator('.card-body b');
    this.cart = page.locator('[routerlink*="cart"]');
    this.orders = page.locator('button[routerlink*="myorders"]');
  }

  async searchProductAndAddToCart(productName: string) {
    const titles = await this.productsText.allTextContents();
    // Instead of writing this we can load the content first so this is not required. Line 13. 
    // console.log(await productName.first().textContent());
    console.log(titles);
  
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      const title = await this.products.nth(i).locator('b').textContent();
      if (title === productName) {
        await this.products.nth(i).locator('text= Add To Cart').click();
        break;
      }
    }
  }

  async navigateToCart() {
    await this.cart.click();
  }

  async navigateToOrders() {
    await this.orders.click();
  }
}

module.exports = { DashboardPage };
