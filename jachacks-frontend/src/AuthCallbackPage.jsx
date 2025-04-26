import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const CallbackPage = () => {
  const { isLoading, isAuthenticated, error, handleRedirectCallback } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processAuth = async () => {
      try {
        await handleRedirectCallback();
        // Redirect to a protected route or the homepage after successful authentication
        navigate('/profile'); // Example: redirect to a profile page
      } catch (err) {
        console.error('Error handling redirect callback:', err);
        // Handle the error appropriately (e.g., display an error message)
      }
    };

    processAuth();
  }, [handleRedirectCallback, navigate]);

  if (isLoading) {
    return <div>Loading authentication...</div>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return <div>Processing authentication...</div>;
};

export default CallbackPage;