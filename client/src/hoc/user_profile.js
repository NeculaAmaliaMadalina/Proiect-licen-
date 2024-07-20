import React from "react";
import { Link } from "react-router-dom";

export const links = [
  {
    name: "Contul meu",
    linkTo: "/profile",
  },
  {
    name: "Informatii user",
    linkTo: "/profile/user/user_info",
  },
  {
    name: "Cosul meu",
    linkTo: "/profile/user/user_cart",
  },
  {
    name: "Produse favorite ",
    linkTo: "/profile/favorites",
  },
  {
    name: "Creeaza retur ",
    linkTo: "/profile/create_retur",
  },
];

const ProfileLayout = (props) => {
  const generateLinks = (links) =>
    links.map((item, i) => (
      <Link to={item.linkTo} key={`${links.name}${i}`}>
        {item.name}
      </Link>
    ));
  return (
    <div className="container">
      <div className="user_container page_container">
        <div className="user_left_nav">
          <h2>Contul meu</h2>
          <div className="links">{generateLinks(links)}</div>
        </div>
        <div className="user_right">
          <div className="dashboard_title">
            <h1>{props.title}</h1>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
