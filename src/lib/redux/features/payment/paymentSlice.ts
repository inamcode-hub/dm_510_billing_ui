// Import necessary modules
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import customFetch from '../../../helper/customFetch';

// Define initial state with TypeScript interfaces
interface Address {
  apartment: string;
  building: string;
  street: string;
  city: string;
  country: string;
  province: string;
  postalCode: string;
}

interface PageStates {
  showProfile: boolean;
  showPackage: boolean;
  showPayment: boolean;
}

interface PaymentState extends Address, PageStates {
  email: string;
  phone: string;
  packageName: 'SingleDryermaster' | 'MultipleDryermaster | string';
  packagePrice: number;
  packageSerialNumber: number[];
  isLoading: boolean;
  data?: string | number | boolean;
  state?: string;
}

const initialState: PaymentState = {
  email: '',
  phone: '',
  apartment: '',
  building: '',
  street: '',
  city: '',
  province: '',
  country: 'us',
  postalCode: '',
  packageName: 'SingleDryermaster',
  packagePrice: '' as any,
  packageSerialNumber: [],
  // by default, show the profile page first and hide the rest.
  showProfile: true,
  showPackage: false,
  showPayment: false,
  isLoading: false,
};

interface UpdateStateActionPayload<T> {
  key: keyof PaymentState;
  value: T;
}

// Async thunk to fetch payment data
export const fetchPaymentData = createAsyncThunk(
  'payment/fetchPaymentData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await customFetch.get('/home');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the payment slice
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    updateState: <T>(
      state: PaymentState,
      action: PayloadAction<UpdateStateActionPayload<T>>
    ) => {
      const { key, value } = action.payload;
      if (key in state) {
        if (typeof value === 'string') {
          (state as any)[key] = value.trim();
        } else {
          (state as any)[key] = value;
        }
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
        console.error('Promise rejected:', payload);
        state.isLoading = false;
      });
  },
});

export default paymentSlice.reducer;
export const { updateState, setShowProfile, setShowPackage, setShowPayment } =
  paymentSlice.actions;
