// Import necessary modules
import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import customFetch from '../../../helper/customFetch';

// Define initial state
interface SampleState {
  data: string;
  isLoading: boolean;
}

const initialState: SampleState = {
  data: '',
  isLoading: false,
};

// Async thunk to fetch sample data
export const fetchSampleData = createAsyncThunk(
  'sample/fetchSampleData',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/home');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Define the sample slice
const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSampleData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSampleData.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.isLoading = false;
      })
      .addCase(fetchSampleData.rejected, (state, { payload }) => {
        console.log('promise rejected:', payload);
        state.isLoading = false;
      });
  },
});

export default sampleSlice.reducer;