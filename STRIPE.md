# Stripe Integration Documentation

## Frontend

### Stripe Documentation

You can refer to Stripe's official documentation for integrating Stripe with React: [Stripe.js and React Integration](https://docs.stripe.com/stripe-js/react).

In this documentation, Stripe uses `stripe.confirmPayment` in the `handleSubmit` function. Instead, in our implementation, we use `stripe.createPaymentMethod` from the Stripe CLI for React and JavaScript.

You can also refer to the Stripe documentation for creating payment methods: [Create Payment Method](https://docs.stripe.com/js/payment_methods/create_payment_method).

### Implementation

For the frontend implementation, you can find the code on GitHub: [Frontend GitHub Code](https://github.com/inamdryermaster/dm_510_billing_ui/blob/df0a2d3295606cb80eb74f99a375b10788b6f92d/src/pages/payment/payment/components/StripeElement.tsx#L49).

---

## Server Side

### Stripe Documentation

You can refer to Stripe's official documentation for handling payment intents: [Stripe Payment Intents API](https://docs.stripe.com/payments/payment-intents).

### Implementation

For the backend implementation, you can find the code on GitHub:

- [Create Payment](https://github.com/inamdryermaster/dm_mobile_api/blob/07dbada25a883de1947556a29a24d3710b215fa8/controllers/dryermaster/account/stripe/createPayment.js#L17)
- [Charge Customer](https://github.com/inamdryermaster/dm_mobile_api/blob/07dbada25a883de1947556a29a24d3710b215fa8/controllers/dryermaster/account/stripe/createPayment.js#L75)

### Summary

This approach allows frontend and backend developers to work together through API calls. Below is a step-by-step explanation of how the integration works:

1. **Frontend Initialization**:

   - The frontend initializes Stripe with the public key and uses Stripe Elements to collect card details from the user.

2. **Creating a Payment Method**:

   - When the user submits the payment form, the frontend uses `stripe.createPaymentMethod` to create a PaymentMethod object.
   - This PaymentMethod object contains the card details and other necessary information.

3. **Sending PaymentMethod ID to the Server**:

   - The frontend sends a POST request to the server at `www.localhost/api/payment` with the `paymentMethodId` obtained from the previous step.

4. **Server Handling the Request**:

   - The server receives the `paymentMethodId` and uses the Stripe secret key to create a PaymentIntent.
   - The server uses the `paymentIntent.create` method to create a PaymentIntent and confirm the payment using the `paymentMethodId`.

5. **Charging the Card**:

   - If the PaymentIntent creation and confirmation are successful, the card is charged.
   - The server sends the response back to the frontend with the payment status.

6. **Updating the UI**:

   - The frontend receives the server response and updates the UI to show the payment success status to the user.

7. **Updating the Database**:
   - On successful payment, the server updates the database to set `customer.has_access` to `true`.

Here's a visual representation of the process:

1. **Frontend (User interaction)**

   - User enters card details -> `stripe.createPaymentMethod` -> PaymentMethod ID

2. **API Call (Frontend to Server)**

   - POST `/api/payment` with PaymentMethod ID

3. **Server (Handling Payment)**

   - Receive PaymentMethod ID -> `paymentIntent.create` -> Charge the card

4. **API Response (Server to Frontend)**

   - Send payment status back to the frontend

5. **Frontend (UI Update)**

   - Update UI with payment success status

6. **Database Update (Server-side)**
   - Update database: `customer.has_access` to `true`

By following these steps, you can ensure a smooth and secure payment process using Stripe. The frontend handles collecting and sending the payment information, while the backend securely processes the payment using the Stripe API and updates the database accordingly.
