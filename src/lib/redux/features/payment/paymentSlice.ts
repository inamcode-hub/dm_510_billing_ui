// Import necessary modules
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../../helper/customFetch';
import { PayloadAction } from '@reduxjs/toolkit';

// Define initial state
interface PaymentState {
  email: string;
  phone: string;
  // Address ----------------
  apartment: string;
  building: string;
  street: string;
  city: string;
  country: string;
  province: string;
  postalCode: string;
  // Pages states ------------
  showProfile: boolean;
  showPackage: boolean;
  showPayment: boolean;
  isLoading: boolean;
  data?: string | number | boolean;
}

type PaymentStateKey =
  | 'showProfile'
  | 'showPackage'
  | 'showPayment'
  | 'isLoading'
  | 'data'
  | 'email'
  | 'phone';
type UpdateStateActionPayload = { key: PaymentStateKey; value: any };

const initialState: PaymentState = {
  email: '',
  phone: '',
  // Address ----------------
  apartment: '',
  building: '',
  street: '',
  city: '',
  province: '',
  country: '',
  postalCode: '',
  // Pages states ------------
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
    updateState: (
      state: any,
      { payload }: PayloadAction<UpdateStateActionPayload>
    ) => {
      if (payload.key in state) {
        state[payload.key as keyof typeof state] = payload.value;
      }
    },
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
export const { updateState, setShowProfile, setShowPackage, setShowPayment } =
  paymentSlice.actions;

export type { PaymentStateKey };
