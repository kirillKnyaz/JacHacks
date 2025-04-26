import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const { isLoading, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      navigate("/dashboard"); // Redirect after successful login
    }
  }, [isLoading]);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return <div>Loading authentication...</div>;
};

export default CallbackPage;
