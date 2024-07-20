import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carrousel = ({ items }) => {
  const settings = {
    dot: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const generateSliders = () =>
    items
      ? items.map((item, i) => (
          <div key={i}>
            <div
              className="featured_images"
              style={{
                background: `url(${item.img})`,
                height: "300px",
                width: "100%",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        ))
      : null;

  return <Slider {...settings}>{generateSliders()}</Slider>;
};

export default Carrousel;
