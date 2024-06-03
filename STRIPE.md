# Stripe Integration Documentation

## Frontend

### Stripe Documentation

You can refer to Stripe's official documentation for integrating Stripe with React: [Stripe.js and React Integration](https://docs.stripe.com/stripe-js/react).

In this documentation, Stripe uses `stripe.confirmPayment` in the `handleSubmit` function. Instead, in our implementation, we use `stripe.createPaymentMethod` from the Stripe CLI for React and JavaScript.

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

On a POST request to the server, you only need the `payment_method` ID to charge the customer. This approach allows the frontend developer and backend developer to work through API calls. The frontend creates a `paymentMethodId` and passes it to the server, which then uses the `paymentIntent.create` method to charge the card.

The frontend uses the public key, while the server uses the secret key for more sensitive payment-related changes.

You need to create a POST endpoint at `www.localhost/api/payment`. This endpoint should wait for a POST request that includes the `paymentMethodId`. The server will create a PaymentIntent, charge the card, and send the response back to the API. The frontend can then show the payment success status in the UI. This interaction occurs through API communication.
