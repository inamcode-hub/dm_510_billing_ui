/// <reference types="vite/client" />

//  typescript types for Vite env variables

interface ImportMetaEnv {
  VITE_API_BASE_URL: string;
  VITE_APP_MODE: 'development' | 'production';
  // Add more environment variables here as needed
}
