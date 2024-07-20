import React from "react";
import Carrousel from "../../utils/carrousel";

const Featured = () => {
  const carruselItems = [
    {
      img: "./images/featured/2.png",
    },
    {
      img: "./images/featured/3.png",
    },
  ];
  return (
    <div className="featured_container">
      <Carrousel items={carruselItems} />
    </div>
  );
};

export default Featured;
