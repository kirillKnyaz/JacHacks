import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const useAuthApi = () => {
  const { getAccessTokenSilently } = useAuth0();  // Get the Auth0 hook here

  // Create an axios instance
  const authApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Your backend URL
  });

  // Interceptor to add token to headers dynamically
  authApi.interceptors.request.use(async (config) => {
    const token = await getAccessTokenSilently({
      audience: "https://yourapi.com",  // Use your audience identifier here
      scope: "read:users",  // Your scope here
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return authApi;
};

export default useAuthApi;