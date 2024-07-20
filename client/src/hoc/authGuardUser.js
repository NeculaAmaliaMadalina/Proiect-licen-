import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../utils/loader";
import { useNavigate } from "react-router-dom";

export default function authGuardUser(ComposedComponent) {
  const AuthentificationCheck = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const users = useSelector((state) => state.users);
    const navigate = useNavigate();
    useEffect(() => {
      if (!users.auth) {
        navigate("/");
      } else {
        setIsAuth(true);
      }
    }, [props, users, navigate]);
    if (!isAuth) {
      return <Loader full={true} />;
    } else {
      return <ComposedComponent users={users} {...props} />;
    }
  };
  return AuthentificationCheck;
}
