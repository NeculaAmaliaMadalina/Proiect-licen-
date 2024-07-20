import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { renderCardImage, SimpleButton } from "../../utils/tools";
import AddToCard from "../../utils/addToCart";
import { userAddCart } from "../../store/actions/user.actions";

const FavoriteDetail = ({ products, removeItem }) => {
  const [modal, setModal] = useState(false);
  const [errorType, setErrorType] = useState(false);
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleClose = () => setModal(false);
  const handleAddToCard = (item) => {
    if (!user.auth) {
      setModal(true);
      setErrorType("auth");
      return false;
    }
    if (!user.data.verified) {
      setModal(true);
      setErrorType("verify");
      return false;
    }
    dispatch(userAddCart(item));
  };
  const renderItems = () =>
    products
      ? products.map((product, index) => (
          <div className="user_product_block" key={`${product._id}${index}`}>
            <div className="item">
              <div
                className="image"
                style={{
                  background: `url(${renderCardImage(
                    product.images
                  )}) no-repeat`,
                }}
              ></div>
            </div>
            <div className="item">
              <h4>Produs</h4>
              <div>
                {product.brand.name} {product.name}
              </div>
            </div>
            <div className="item">
              <h4>Brand</h4>
              <div>{product.brand.name}</div>
            </div>
            <div className="item">
              <h4>Preț</h4>
              <div>{product.price}</div>
            </div>
            <div className="item_btn">
              <div
                className="cart_remove_btn"
                onClick={() => removeItem(index)}
              >
                Șterge
              </div>
            </div>
            <div className="item_btn">
              <div
                className="add_cart_btn"
                onClick={() => handleAddToCard(product)}
              >
                Adaugă în coș
              </div>
            </div>
            <AddToCard
              modal={modal}
              errorType={errorType}
              handleClose={handleClose}
            />
          </div>
        ))
      : null;
  return <div>{renderItems()}</div>;
};

export default FavoriteDetail;
