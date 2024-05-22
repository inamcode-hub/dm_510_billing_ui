// Import necessary modules
import { configureStore } from '@reduxjs/toolkit';
import sampleSlice from './features/sample/sampleSlice';
import paymentSlice from './features/payment/paymentSlice';

const store = configureStore({
  reducer: {
    sample: sampleSlice,
    payment: paymentSlice,
  },
});

export default store;

// Optional: Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
