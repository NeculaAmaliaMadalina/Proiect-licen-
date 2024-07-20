import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../utils/loader";
import { useNavigate } from "react-router-dom";

export default function authGuardAdmin(ComposedComponent) {
  const AuthentificationCheckAdmin = (props) => {
    const users = useSelector((state) => state.users);
    const navigate = useNavigate();

    useEffect(() => {
      if (!users.auth && !users.isAdmin) {
        navigate("/sign_in");
      }
    }, [users.auth, users.isAdmin, navigate]);

    if (!users.auth || !users.isAdmin) {
      return <Loader full={true} />;
    } else {
      return <ComposedComponent {...props} />;
    }
  };

  return AuthentificationCheckAdmin;
}
