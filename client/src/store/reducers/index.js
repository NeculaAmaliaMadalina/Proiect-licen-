import { combineReducers } from "redux";
import users from "../reducers/users.reducer";
import products from "../reducers/products.reducer";
import notificationsReducer from "../reducers/notification.reducer";
import brands from "./brand.reducer";
import category from "./category.reducer";
import subcategory from "./subcategory.reducer";
import searchReducer from "./search.reducer";
import orderReducer from "./order.reducer";
import site from "./site.reducer";
import returs from "./retur.reducer";
import discount from "./discount.reducer";

const appReducers = combineReducers({
  users,
  products,
  notifications: notificationsReducer,
  brands,
  category,
  subcategory,
  searchReducer,
  order: orderReducer,
  site,
  returs,
  discount,
});

export default appReducers;
