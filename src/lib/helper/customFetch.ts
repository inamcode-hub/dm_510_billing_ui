// Import necessary modules
import axios from 'axios';

// Get the API host from environment variables
const API_HOST = import.meta.env.VITE_API_HOST;

const customFetch = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
    // Add any additional headers if needed
  },
});

export default customFetch;