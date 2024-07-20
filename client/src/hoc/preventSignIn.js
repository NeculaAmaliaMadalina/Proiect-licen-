import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PreventSignIn = (props) => {
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  useEffect(() => {
    if (users.auth) {
      if (users.role === "admin") {
        navigate("/admin_dashboard");
      } else {
        navigate("/");
      }
    }
  }, [users.auth, users.isAdmin, navigate, users.role]);

  return props.children;
};

export default PreventSignIn;
