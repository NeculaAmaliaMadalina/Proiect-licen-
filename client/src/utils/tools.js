import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import cookie from "react-cookies";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const SimpleButton = (props) => {
  let templete = "";

  switch (props.type) {
    case "default":
      templete = (
        <Link
          className={!props.altClass ? "link_default" : props.altClass}
          to={props.linkTo}
          style={{
            ...props.style,
          }}
        >
          {props.title}
        </Link>
      );
      break;
    case "bag_link":
      templete = (
        <div
          className="bag_link"
          onClick={() => {
            props.runAction();
          }}
          style={{ ...props.style }}
        >
          <ShoppingCartIcon style={{ fontSize: props.iconSize }} />
        </div>
      );
      break;
    case "fav_link":
      templete = (
        <div
          className="fav_link"
          onClick={() => {
            props.runAction();
          }}
          style={{ ...props.style }}
        >
          <FavoriteIcon style={{ fontSize: props.iconSize }} />
        </div>
      );
      break;
    case "add_to_cart":
      templete = (
        <div
          className="add_to_cart"
          onClick={() => {
            props.runAction();
          }}
        >
          <ShoppingCartIcon />
          Add to cart
        </div>
      );
      break;
    default:
      templete = "";
  }

  return templete;
};

export const renderCardImage = (image) => {
  if (image && image.length > 0) {
    return image[0];
  } else {
    return "/images/image_not_available.jpg";
  }
};
export const showToast = (type, msg) => {
  switch (type) {
    case "SUCCESS":
      toast.success(msg, {
        position: "bottom-right",
      });
      break;
    case "ERROR":
      toast.error(msg, {
        position: "bottom-right",
      });
      break;
    default:
      return false;
  }
};

export const errorHelper = (formik, value) => ({
  error: formik.errors[value] && formik.touched[value] ? true : false,
  helperText:
    formik.errors[value] && formik.touched[value] ? formik.errors[value] : null,
});

export const getTokenCookie = () => cookie.load("x-access-token");
export const removeTokenCookie = () =>
  cookie.remove("x-access-token", { path: "/" });
export const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getTokenCookie()}` } };
};
