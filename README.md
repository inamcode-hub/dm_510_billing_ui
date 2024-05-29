# Dm Mobile Billing UI

This project is a mobile billing user interface that uses Stripe for payment processing and Material-UI for the user interface. The application takes user input, communicates with Stripe to get payment details, and then posts these details to a server to charge the card.

## Environment Variables

This project uses several environment variables to configure various aspects of the application. These are stored in a `.env` file. Here's a brief description of each:

- `VITE_REDIRECT_URL_NAV`: This is the URL where the client will be redirected after certain operations. It typically points to the application's dashboard.
- `VITE_STRIPE_KEY`: This is the Stripe API key for handling payments in Canada.
- `VITE_STRIPE_KEY_US`: This is the Stripe API key for handling payments in the United States.
- `VITE_API_URL`: This is the base URL for making API calls to the backend. The actual endpoints will be relative to this base URL.

## API Endpoints

- `POST /payment`: This endpoint is used to initiate a payment. The payment details should be sent in the request body.

## Stripe Integration

This application uses Stripe for payment processing. Depending on the user's location, it will use either the `VITE_STRIPE_KEY` or `VITE_STRIPE_KEY_US` for transactions.

## Key Libraries

- `TypeScript`: This project is written in TypeScript, a statically typed superset of JavaScript that adds types and other powerful features. It helps catch errors early in the development process.

- `Formik`: This is a powerful library that simplifies the process of building, validating, and handling forms in React. It works well with complex validation rules and is compatible with a variety of form controls.

- `Yup`: This is a JavaScript schema builder for value parsing and validation. In this project, it's used alongside Formik to validate form fields.

- `@reduxjs/toolkit`: This is a library to set up a Redux store for state management. Redux is a predictable state container for JavaScript apps.

- `@stripe/react-stripe-js` and `@stripe/stripe-js`: These are used for integrating with Stripe for payment processing.

- `@mui/material` and `@mui/icons-material`: These are Material-UI libraries, which provide pre-built React components following Material Design guidelines.

## Getting Started

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Create a `.env` file in the root directory. This file should contain the following environment variables:

   ```plaintext
   VITE_REDIRECT_URL_NAV=<your-redirect-url>
   VITE_STRIPE_KEY=<your-stripe-key-for-Canada>
   VITE_STRIPE_KEY_US=<your-stripe-key-for-US>
   VITE_API_URL=<your-api-base-url>
   ```

   Replace `<your-redirect-url>`, `<your-stripe-key-for-Canada>`, `<your-stripe-key-for-US>`, and `<your-api-base-url>` with your actual values.

4. Start the development server with `npm start`.

## Contributing

Contributions are welcome! Please read the [contributing guide](CONTRIBUTING.md) to get started.
