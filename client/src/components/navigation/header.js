import React, { useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./searchBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { productsByPaginate } from "../../store/actions/product.action";

const defaultValues = {
  keywords: "",
};

const Header = ({ users, signOutUser }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keywords = queryParams.get("keywords") || "";
  const cartItems = useSelector((state) => state.users.cart);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const favoriteItemCount = useSelector((state) => state.users.favorite.length);
  const [search, setSearch] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    defaultValues
  );

  const handleKeywords = (values) => {
    setSearch({ keywords: values });
  };
  const handleResetSearch = () => {
    setSearch({ keywords: "", page: 1 });
  };
  useEffect(() => {
    setSearch({ keywords: keywords });
  }, [location.search, keywords]);

  useEffect(() => {
    dispatch(productsByPaginate(search));
  }, [search, dispatch]);

  return (
    <header className="header-container">
      <div className="header bg-dark text-white p-3">
        <div className="transport-info">
          Livrare gratuită la comenzile peste 250 lei
        </div>
      </div>
      <div className="middle-header">
        <div className="search-bar">
          <SearchBar
            handleKeywords={(values) => handleKeywords(values)}
            resetSearch={() => handleResetSearch()}
          />
        </div>
        <Link to="/" className="logo">
          <img src="/images/Magic.ico" alt="logo" />
        </Link>
        <div className="middle-header-right">
          <Link to="/profile/favorites" className="icon">
            <FavoriteIcon />
            {favoriteItemCount > 0 && (
              <span className="cart-item-count">{favoriteItemCount}</span>
            )}
          </Link>
          <Link to="/profile/user/user_cart" className="icon">
            <ShoppingCartIcon />
            {cartItemCount > 0 && (
              <span className="cart-item-count">{cartItemCount}</span>
            )}
          </Link>
          {users.auth ? (
            <>
              <Link to="/profile" className="icon">
                <AccountCircleIcon />
              </Link>
              <div className="icon" onClick={() => signOutUser()}>
                <LogoutIcon />
              </div>
            </>
          ) : (
            <Link to="/sign_in" className="icon">
              <LoginIcon />
            </Link>
          )}
        </div>
      </div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <div className="container">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/products_shop">TOATE ARTICOLELE</Nav.Link>
              <Nav.Link href="/products_shop/660a94667b47c8d1a9b6e3c5">
                FEMEI
              </Nav.Link>
              <Nav.Link href="/products_shop/6606fa99fa536bb2cc03c5f9">
                FETITE
              </Nav.Link>
              <Nav.Link href="/products_shop/660a94617b47c8d1a9b6e3c2">
                BARBATI
              </Nav.Link>
              <Nav.Link href="/products_shop/660a94587b47c8d1a9b6e3bf">
                BAIETI
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
