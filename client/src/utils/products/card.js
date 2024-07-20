import React, { useState } from "react";
import { renderCardImage, SimpleButton } from "../tools";
import { useSelector, useDispatch } from "react-redux";
import AddToCard from "../addToCart";
import { userAddCart } from "../../store/actions/user.actions";
import { userAddFavorites } from "../../store/actions/user.actions";

const Card = (props) => {
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

  const handleAddToFav = (item) => {
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
    dispatch(userAddFavorites(item));
  };

  return (
    <div className={`card_item_wrapper ${props.grid ? "grid_bard" : ""}`}>
      <div
        className="image"
        style={{
          background: `url(${renderCardImage(props.item.images)})`,
        }}
      ></div>
      <div className="action_container">
        <div className="tags">
          <div className="brand">{props.item.brand.name}</div>
          <div className="name">{props.item.name}</div>
          <div className="price">{props.item.price} lei</div>
        </div>
        {props.grid ? (
          <div className="descriptions">
            <p>{props.item.description}</p>
            <p className="card_color">Color: {props.item.color}</p>
            <p className="card_size">Size: {props.item.size}</p>
          </div>
        ) : null}

        <div className="actions">
          <div className="button_wrap">
            <SimpleButton
              type="default"
              altClass="card_link"
              title="Vezi produsul"
              linkTo={`/product_detail/${props.item._id}`}
              style={{
                fontWeight: "bold",
              }}
            />
          </div>
          <div className="button_wrap">
            <SimpleButton
              type="fav_link"
              runAction={() => handleAddToFav(props.item)}
              iconSize="24"
            />
          </div>
          <div className="button_wrap">
            <SimpleButton
              type="bag_link"
              runAction={() => handleAddToCard(props.item)}
              iconSize="24"
            />
          </div>
        </div>
      </div>
      <AddToCard
        modal={modal}
        errorType={errorType}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Card;
