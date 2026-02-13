Feature: Ecommerce validations
@Regression
Scenario: Placing the order
  Given A login to Ecommerce application with "anjali.vijay@axelerant.com" and "Learning@830$3mK2"
  When Add "ADIDAS ORIGINAL" to the cart
  Then Verify "ADIDAS ORIGINAL" is displayed in the cart
  When Enter valid details and Place the order
  Then Verify order is present in OrderHistory
