import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/loader";
import { clearProduct } from "../../store/actions";
import ProductInfo from "./product_info";
import { renderCardImage } from "../../utils/tools";
import { getProductById } from "../../store/actions/product.action";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = (props) => {
  const [modal, setModal] = useState(false);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();
  const sliderSetting = {
    dot: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleCloseSlider = () => {
    setModal(false);
  };
  const handleCarrouse = () => {
    if (products.byId.images.length > 0) {
      setModal(true);
    }
  };
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch]);
  return (
    <div className="page_container">
      <div className="page_top">
        <div className="container">Detalii produs</div>
      </div>
      <div className="container">
        {products && products.byId ? (
          <div className="product_detail_wrapper">
            <div className="left_pd">
              <div>
                <img
                  alt=""
                  src={renderCardImage(products.byId.images)}
                  onClick={() => handleCarrouse()}
                ></img>
              </div>
            </div>
            <div className="right">
              <div>
                <ProductInfo detail={products.byId} />
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>

      <Modal
        show={modal}
        onHide={handleCloseSlider}
        style={{
          width: "100%",
          height: "100vh",
          margin: 0,
        }}
        centered
        size="lg"
        backdrop
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Slider {...sliderSetting}>
            {products.byId && products.byId.images
              ? products.byId.images.map((item) => (
                  <div key={item}>
                    <img
                      src={item}
                      alt="product"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "80vh",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                  </div>
                ))
              : null}
          </Slider>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductDetail;
