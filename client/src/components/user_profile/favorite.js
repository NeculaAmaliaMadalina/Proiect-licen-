import React, { useState } from "react";
import ProfileLayout from "../../hoc/user_profile";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromFav } from "../../store/actions/user.actions";
import { userAddCart } from "../../store/actions/user.actions";
import FavoriteDetail from "./favoriteDetail";
import AddToCard from "../../utils/addToCart";

const UserFavoritesItem = (props) => {
  const [modal, setModal] = useState(false);
  const [errorType, setErrorType] = useState(false);
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const removeItem = (index) => {
    dispatch(removeItemFromFav(index));
  };

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

  return (
    <ProfileLayout title="Produsele tale favorite">
      {props.users.favorite && props.users.favorite.length > 0 ? (
        <>
          <FavoriteDetail
            products={props.users.favorite}
            removeItem={(index) => removeItem(index)}
            addToCart={(index) => handleAddToCard(index)}
          />
        </>
      ) : (
        <div>Nu ai adăugat produse în lista ta de favorite</div>
      )}
      <AddToCard
        modal={modal}
        errorType={errorType}
        handleClose={handleClose}
      />
    </ProfileLayout>
  );
};

export default UserFavoritesItem;
