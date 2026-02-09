const base = require('@playwright/test');

exports.customTestData = base.test.extend({
  testData: {
    username: "anjali.vijay@axelerant.com",
    password: "Learning@830$3mK2",
    productName: "ADIDAS ORIGINAL"
  }
});
