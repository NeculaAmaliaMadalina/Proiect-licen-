import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import CardDetail from "../user_profile/DetailCart";
import { removeItemFromCart } from "../../store/actions/user.actions";
import { orderAdd } from "../../store/actions/order.action";
import { errorHelper } from "../../utils/tools";
import validationSchema from "../cart/validation";
import { applyDiscountByCode } from "../../store/actions/discount.actions";
import { TotalWithDiscount } from "../../store/actions";
import { discountApplied } from "../../store/actions";
import { getAllDiscounts } from "../../store/actions/discount.actions";
import {
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Collapse,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyIcon from "@mui/icons-material/Money";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import {
  IncreseProductQuantity,
  decreaseProductQuantity,
} from "../../store/actions/user.actions";
import * as actions from "../../store/actions";
const CompleteOrder = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.users.cart);
  const users = useSelector((state) => state.users);
  const discounts = useSelector((state) => state.discount.all);
  const appliedDis = useSelector((state) => state.discount.discount);
  const notifications = useSelector((state) => state.notifications);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const totalWithDiscount = useSelector(
    (state) => state.discount.totalWithDiscount
  );
  const [voucherValue, setVoucherValue] = useState(0);
  const [code, setCode] = useState("");
  const removeItem = (index) => {
    dispatch(removeItemFromCart(index));
  };
  const handleIncreaseQuantity = (_id) => {
    dispatch(IncreseProductQuantity(_id));
  };

  const handleDecreaseQuantity = (_id) => {
    dispatch(decreaseProductQuantity(_id));
  };
  const handleApplyDiscount = () => {
    dispatch(applyDiscountByCode(code));
    const selectedDiscount = discounts.find(
      (discount) => discount.code === code
    );

    if (selectedDiscount) {
      const currentDate = new Date();
      if (
        currentDate >= new Date(selectedDiscount.validFrom) &&
        currentDate <= new Date(selectedDiscount.validUntil)
      ) {
        if (calculateTotal() >= selectedDiscount.minimumAmount) {
          setVoucherApplied(true);
          let totalWithDiscount;
          if (selectedDiscount.type === "percentage") {
            const discountAmount = Math.round(
              (calculateTotal() * selectedDiscount.value) / 100
            );
            totalWithDiscount = calculateTotal() - discountAmount;
            setVoucherValue(discountAmount);
          } else if (selectedDiscount.type === "fixed") {
            totalWithDiscount = calculateTotal() - selectedDiscount.value;
            setVoucherValue(selectedDiscount.value);
          }
          dispatch(
            discountApplied({ discount: selectedDiscount, totalWithDiscount })
          );
          dispatch(TotalWithDiscount(totalWithDiscount));
        } else {
          dispatch(
            actions.errorGlobal(
              "Suma minimă pentru aplicarea voucherului nu a fost atinsă."
            )
          );
        }
      } else {
        dispatch(
          actions.errorGlobal(
            "Codul promoțional nu este valabil în acest moment."
          )
        );
      }
    } else {
      setVoucherApplied(false);
      setVoucherValue(0);
      dispatch(actions.errorGlobal("Codul introdus nu este valid"));
    }
  };
  const [selectedOption, setSelectedOption] = useState("cash");
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    formik.setFieldValue("method", value);
    console.log(value);
    if (value === "card") {
      setShowCreditCardForm(true);
    } else {
      setShowCreditCardForm(false);
    }
  };
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    formik.handleChange(evt);
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({
      ...prev,
      focus: evt.target.name,
    }));
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

  const calculateTotalWithDiscount = () => {
    const subtotal = calculateTotal();
    const deliveryFee = calculateTotal() < 250 ? 20 : 0;
    const total = subtotal + deliveryFee;

    const totalWithDiscount = voucherApplied ? total - voucherValue : total;

    return totalWithDiscount;
  };
  useEffect(() => {
    dispatch(getAllDiscounts());
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      city: "",
      method: "cash",
      number: "",
      nameOnCard: "",
      expiry: "",
      cvc: "",
      discountCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const orderData = {
        products: cart,
        userId: users.data._id,
        contactInfo: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          county: values.country,
          city: values.city,
        },
        paymentInfo: {
          method: selectedOption,
        },
        totalAmount: calculateTotal() + (calculateTotal() < 250 ? 20 : 0),
        discountCart: appliedDis ? appliedDis._id : null,
        totalWithDiscount: appliedDis
          ? totalWithDiscount
          : calculateTotal() + (calculateTotal() < 250 ? 20 : 0),
      };
      if (selectedOption === "card") {
        orderData.paymentInfo.cardDetails = {
          number: values.number,
          name: values.nameOnCard,
          expiry: values.expiry,
          cvc: values.cvc,
        };
      }
      await dispatch(orderAdd(orderData));
      setLoading(false);
    },
  });
  useEffect(() => {
    if (notifications && notifications.success) {
      navigate("/profile");
      setTimeout(() => {
        window.location.reload();
      }, 500); // Delay de 500ms pentru a permite navigarea
    }
  }, [notifications, navigate]);
  return (
    <div className="container_comanda">
      <div className="left">
        <div className="title">
          <h1>Finalizare comanda</h1>
        </div>
        <div className="block_produse">
          <div className="product_title">
            <h2>Produse</h2>
          </div>
          <div className="continut_cos">
            {cart && cart.length > 0 ? (
              <>
                <CardDetail
                  products={cart}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                  handleIncreaseQuantity={handleIncreaseQuantity}
                  removeItem={(index) => removeItem(index)}
                />
                <div className="user_cart_sum">
                  <div>Total produse din coș: {calculateTotal()} lei</div>
                </div>
              </>
            ) : (
              <div>Nu ai adăugat produse în coș</div>
            )}
          </div>
        </div>
        <div className="block_produse">
          <div className="product_title">
            <h2>Informatii contact</h2>
          </div>
          <div className="continut_informatii">
            <form className="mt-3">
              <div className="form-group">
                <TextField
                  style={{ width: "100%" }}
                  name="name"
                  label="Introdu numele"
                  variant="outlined"
                  {...formik.getFieldProps("name")}
                  {...errorHelper(formik, "name")}
                />
              </div>
              <div className="half_form">
                <div className="form-group">
                  <TextField
                    style={{ width: "100%" }}
                    name="email"
                    label="Introdu emailul"
                    variant="outlined"
                    {...formik.getFieldProps("email")}
                    {...errorHelper(formik, "email")}
                  />
                </div>
              </div>
              <div className="half_form">
                <div className="form-group">
                  <TextField
                    style={{ width: "100%" }}
                    name="phone"
                    label="Introdu numărul de telefon"
                    variant="outlined"
                    {...formik.getFieldProps("phone")}
                    {...errorHelper(formik, "phone")}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="block_produse">
          <div className="product_title">
            <h2>Detalii plata</h2>
          </div>
          <div className="continut_cos">
            <RadioGroup
              aria-label="payment-option"
              name="payment-option"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label={
                  <>
                    <MoneyIcon />
                    Ramburs
                  </>
                }
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label={
                  <>
                    <CreditCardIcon />
                    Card
                  </>
                }
              />
            </RadioGroup>
            <div className="container_card">
              {showCreditCardForm && (
                <Cards
                  className="card_detail"
                  number={formik.values.number}
                  name={formik.values.nameOnCard}
                  expiry={formik.values.expiry}
                  cvc={formik.values.cvc}
                  focused={state.focus}
                />
              )}
              {showCreditCardForm && (
                <form className="card_form">
                  <div className="form-group">
                    <TextField
                      name="number"
                      label="Număr card"
                      variant="outlined"
                      value={state.number}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      {...formik.getFieldProps("number")}
                      {...errorHelper(formik, "number")}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      name="nameOnCard"
                      label="Numele de pe card"
                      variant="outlined"
                      value={state.name}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      {...formik.getFieldProps("nameOnCard")}
                      {...errorHelper(formik, "nameOnCard")}
                    />
                  </div>
                  <div className="half_form">
                    <div className="form-group">
                      <TextField
                        label="Expirare (MM/YY)"
                        name="expiry"
                        variant="outlined"
                        value={formik.values.expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        {...formik.getFieldProps("expiry")}
                        {...errorHelper(formik, "expiry")}
                      />
                    </div>
                  </div>
                  <div className="half_form">
                    <div className="form-group">
                      <TextField
                        name="cvc"
                        label="CVC"
                        variant="outlined"
                        value={state.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        {...formik.getFieldProps("cvc")}
                        {...errorHelper(formik, "cvc")}
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>
            <div className="discount_form_wrapper">
              <Button onClick={() => setOpen(!open)}>
                {open ? "Ascunde formularul" : "Ai un cod de reducere?"}
              </Button>
              <Collapse in={open}>
                <div className="discount_form">
                  <TextField
                    label="Introdu codul de reducere"
                    variant="outlined"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApplyDiscount}
                  >
                    Aplică voucherul
                  </Button>
                </div>
              </Collapse>
            </div>
          </div>
        </div>
        <div className="block_produse">
          <div className="product_title">
            <h2>Detalii livrare</h2>
          </div>
          <div className="continut_informatii">
            <form className="mt-3">
              <div className="form-group">
                <TextField
                  style={{ width: "100%" }}
                  name="address"
                  label="Adresa de livrare(strada, numar, bloc, scara, etaj, apartament)"
                  variant="outlined"
                  {...formik.getFieldProps("address")}
                  {...errorHelper(formik, "address")}
                />
              </div>
              <div className="half_form">
                <div className="form-group">
                  <TextField
                    style={{ width: "100%" }}
                    name="country"
                    label="Introdu judetul"
                    variant="outlined"
                    {...formik.getFieldProps("country")}
                    {...errorHelper(formik, "country")}
                  />
                </div>
              </div>
              <div className="half_form">
                <div className="form-group">
                  <TextField
                    style={{ width: "100%" }}
                    name="city"
                    label="Introdu localitatea"
                    variant="outlined"
                    {...formik.getFieldProps("city")}
                    {...errorHelper(formik, "city")}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="right_cont">
        <div className="cart_resume">
          <div className="product_title">
            <h2>SUMARUL COMENZII</h2>
          </div>
          <div className="subtotal">
            <div className="subtotal_left">
              <h4>
                <b>Subtotal</b>
              </h4>
            </div>
            <div className="subtotal_right">
              <h4>{calculateTotal()} lei </h4>
            </div>
          </div>
          <div className="subtotal">
            <div className="subtotal_left">
              <h4>
                <b>Livrare</b>
              </h4>
            </div>
            <div className="subtotal_right">
              {calculateTotal() < 250 ? <h4>20 lei</h4> : <h4>0 lei</h4>}
            </div>
          </div>
          <div className="subtotal">
            <div className="subtotal_left">
              <h4>
                <b>Total</b>
              </h4>
            </div>
            <div className="subtotal_right">
              <h4>
                {calculateTotal() + (calculateTotal() < 250 ? 20 : 0)} lei
              </h4>
            </div>
          </div>
          {voucherApplied && (
            <div>
              <div className="subtotal">
                <div className="subtotal_left">
                  <h4>
                    <b>Voucher</b>
                  </h4>
                </div>
                <div className="subtotal_right">
                  <h4>{voucherValue} lei</h4>
                </div>
              </div>
              <div className="subtotal">
                <div className="subtotal_left">
                  <h4>
                    <b>Total cu voucher</b>
                  </h4>
                </div>
                <div className="subtotal_right">
                  <h4>{calculateTotalWithDiscount()} lei</h4>
                </div>
              </div>
            </div>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            style={{ textAlign: "center" }}
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Trimite comanda
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompleteOrder;
