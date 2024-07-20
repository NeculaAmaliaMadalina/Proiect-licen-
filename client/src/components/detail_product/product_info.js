import React, { useState } from "react";
import { SimpleButton } from "../../utils/tools";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { userAddCart } from "../../store/actions/user.actions";
import AddToCard from "../../utils/addToCart";
import { useSelector, useDispatch } from "react-redux";

const ProductInfo = (props) => {
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

  const showProductTags = (detail) => (
    <div className="product_tags">
      <div className="tag">
        <div>
          <LocalShippingIcon />
        </div>
        <div className="tag_text">
          {detail.shipping ? (
            <div>Transport gratuit </div>
          ) : (
            <div> Trebuie să plătești pentru livrare. </div>
          )}
        </div>
      </div>
      {detail.available > 0 ? (
        <div className="tag">
          <div>
            <DoneOutlineIcon />
          </div>
          <div className="tag_text">
            <div>
              {" "}
              <strong>{detail.available}</strong> produse disponibile
            </div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div>
            <SentimentVeryDissatisfiedIcon />
          </div>
          <div className="tag_text">
            <div> Scuze, produsul nu este disponibil</div>
          </div>
        </div>
      )}
    </div>
  );
  const showProductSpecification = (detail) => (
    <div className="product_specification">
      <h2>Specificatii: </h2>
      <div className="item">
        <strong>Categorie: </strong> {detail.category.name}
      </div>
      <div className="item">
        <strong>Subcategorie: </strong> {detail.subcategory.name}
      </div>
      <div className="item">
        <strong>Culoare: </strong> {detail.color}
      </div>
      <div className="item">
        <strong>Mărime: </strong> {detail.size}
      </div>
    </div>
  );

  const showProductActions = (detail) => (
    <div className="product_actions">
      <div className="price">{detail.price} lei</div>
      <div className="add_cart_btn">
        <SimpleButton
          className="add_cart_btn"
          type="add_to_cart"
          runAction={() => handleAddToCard(detail)}
        />
      </div>
    </div>
  );
  const detail = props.detail;
  return (
    <div>
      <h1>
        {detail.brand.name} {detail.name}{" "}
      </h1>
      <p>{detail.description}</p>
      {showProductTags(detail)}
      {showProductActions(detail)}
      {showProductSpecification(detail)}
      <AddToCard
        modal={modal}
        errorType={errorType}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ProductInfo;
