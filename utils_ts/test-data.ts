import {test as baseTest} from '@playwright/test';

interface TestData {
  username: string;
  password: string;
  productName: string;
}

export const customTest = baseTest.extend<{testData: TestData}>({
  testData: {
    username: "anjali.vijay@axelerant.com",
    password: "Learning@830$3mK2",
    productName: "ADIDAS ORIGINAL",
  }
});
