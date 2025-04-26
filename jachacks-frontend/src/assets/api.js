import axios from 'axios';
import { getAccessTokenSilently } from '@auth0/auth0-react';

const authApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

authApi.interceptors.request.use(async (config) => {
  const token = await getAccessTokenSilently();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default authApi;