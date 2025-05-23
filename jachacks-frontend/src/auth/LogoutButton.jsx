import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className="btn btn-danger" onClick={() => logout({ logoutParams: { returnTo: window.location.origin + "/logout" } })}>
      Log Out
    </button>
  );
};

export default LogoutButton;
