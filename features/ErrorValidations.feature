Feature: Error validations
@Validation
Scenario Outline: Placing the order
  Given A login to Ecommerce2 application with "<username>" and "<password>"
  Then Verify error message is displayed

  Examples:
    | username                   | password          |
    | anjali.vijay@axelerant.com | Learning@830$3mK2 |
    | anshika@gmail.com          | Iamking@000       |
