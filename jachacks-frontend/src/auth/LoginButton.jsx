import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="btn btn-primary" onClick={() => loginWithRedirect({
      authorizationParams: {
        prompt: "login",
      }
    })}>
      Log In
    </button>
  );
};

export default LoginButton;
