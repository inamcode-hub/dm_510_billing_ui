// Import necessary modules
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../../helper/customFetch';

// Define initial state
interface PaymentState {
  showProfile: boolean;
  showPackage: boolean;
  showPayment: boolean;
  isLoading: boolean;
  data?: any;
}

const initialState: PaymentState = {
  showProfile: true,
  showPackage: false,
  showPayment: false,
  isLoading: false,
};

// Async thunk to fetch payment data
export const fetchPaymentData = createAsyncThunk(
  'payment/fetchPaymentData',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/home');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Define the payment slice
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setShowProfile: (state) => {
      state.showProfile = true;
      state.showPackage = false;
      state.showPayment = false;
    },
    setShowPackage: (state) => {
      state.showProfile = false;
      state.showPackage = true;
      state.showPayment = false;
    },
    setShowPayment: (state) => {
      state.showProfile = false;
      state.showPackage = false;
      state.showPayment = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPaymentData.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.isLoading = false;
      })
      .addCase(fetchPaymentData.rejected, (state, { payload }) => {
        console.log('promise rejected:', payload);
        state.isLoading = false;
      });
  },
});

export default paymentSlice.reducer;
export const { setShowProfile, setShowPackage, setShowPayment } =
  paymentSlice.actions;
