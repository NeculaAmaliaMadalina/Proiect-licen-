import React from "react";
import ProfileLayout from "../../hoc/user_profile";
import { useDispatch, useSelector } from "react-redux";
import CardDetail from "./DetailCart";
import { removeItemFromCart } from "../../store/actions/user.actions";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  IncreseProductQuantity,
  decreaseProductQuantity,
} from "../../store/actions/user.actions";

const UserCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.users.cart);

  const removeItem = (index) => {
    dispatch(removeItemFromCart(index));
  };

  const handleIncreaseQuantity = (_id) => {
    dispatch(IncreseProductQuantity(_id));
  };

  const handleDecreaseQuantity = (_id) => {
    dispatch(decreaseProductQuantity(_id));
  };

  const redirectToFinalizare = () => {
    navigate("/finalizare_comanda");
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      const quantity = product.quantity;
      const price = parseFloat(product.item.price);
      const productTotal = quantity * price;
      total += productTotal;
    });
    return total;
  };

  return (
    <ProfileLayout title="Coșul de cumpărături">
      {cart && cart.length > 0 ? (
        <>
          <CardDetail
            products={cart}
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
            removeItem={removeItem}
          />
          <div className="user_cart_sum">
            <div>Valoare: ${calculateTotal()}</div>
          </div>
          <Button variant="primary" onClick={redirectToFinalizare}>
            Finalizare comanda
          </Button>
        </>
      ) : (
        <div>Nu ai adăugat produse în coș</div>
      )}
    </ProfileLayout>
  );
};

export default UserCart;
