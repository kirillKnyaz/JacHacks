import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthApi from "./assets/api";


const CallbackPage = () => {
  const { isLoading, error , isAuthenticated, logout, getAccessTokenSilently, loginWithRedirect} = useAuth0();
  const navigate = useNavigate();
  const authApi = useAuthApi();

  useEffect(() => {
    const handleAuthentication = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        if (!token) {
          console.error("No token found, returning...");
          return;
        } else if (token) {
          console.log("Token found:", token);
        }
        // Call your Spring backend to register the user
        authApi.get('/public/auth/register', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          console.log("User registered successfully:", response.data);
          navigate("/home");
        }).catch((error) => {
          console.error("Error registering user:", error); // Logout in case of error
        })
      }
    }

    if (!isLoading) {
      handleAuthentication();
    }
  }, [isLoading]);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return <div>Loading authentication...</div>;
};

export default CallbackPage;
