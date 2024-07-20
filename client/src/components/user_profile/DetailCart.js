import React, { useState } from "react";
import { renderCardImage } from "../../utils/tools";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CardDetail = ({
  products,
  removeItem,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
}) => {
  const cart = useSelector((state) => state.users.cart);
  const renderItems = () =>
    products
      ? products.map((product, index) => (
          <div className="user_product_block" key={`${product._id}${index}`}>
            <div className="item">
              <div
                className="image"
                style={{
                  background: `url(${renderCardImage(
                    product.item.images
                  )}) no-repeat`,
                }}
              ></div>
            </div>
            <div className="item">
              <h4>Produs</h4>
              <div>{product.item.name}</div>
            </div>
            <div className="item">
              <h4>Brand</h4>
              <div>{product.item.name}</div>
            </div>
            <div className="item">
              <h4>Preț</h4>
              <div>{product.item.price}</div>
            </div>
            <div className="item">
              <h4>Cantitate</h4>
              <div className="quantity_controls">
                <span className="quantity_number">{product.quantity}</span>
              </div>
            </div>
            <div className="item_btn">
              <RemoveIcon
                className="quantity_icon"
                onClick={() => handleDecreaseQuantity(product.item._id)}
              />
              <AddIcon
                className="quantity_icon"
                onClick={() => handleIncreaseQuantity(product.item._id)}
              />
              <div
                className="cart_remove_btn"
                onClick={() => removeItem(index)}
              >
                Șterge
              </div>
            </div>
          </div>
        ))
      : null;
  return <div>{renderItems()}</div>;
};

export default CardDetail;
