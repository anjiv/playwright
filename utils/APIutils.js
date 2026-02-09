class APIutils {

  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    // POST request to login to the API.
    // Get the endpoint from Network tab in browser -> Headers -> Request URL.
    const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { // login to the API. Post request is used to login to the API.
      data: this.loginPayload, // login payload.
    })
    const loginResponseJson = await loginResponse.json(); // get the login response in JSON format.
    const token = loginResponseJson.token; // get the token from the login response.
    console.log(token);
    return token;
  }

  async createOrder(orderPayload) {
    let response = {};
    response.token = await this.getToken();
    // POST request to add product to the cart.
    const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
      data: orderPayload,
      headers: {
        'Authorization': response.token,
        'Content-Type': 'application/json',
      }
    })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;
    return response;
  }
}

module.exports = { APIutils };
