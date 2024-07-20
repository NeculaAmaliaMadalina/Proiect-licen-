import {
  GET_PROD_BY_DATE,
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  CLEAR_NOTIFICATION,
  AUTH_USER,
  SIGN_OUT,
  USER_TYPE,
  UPDATE_USER_PROFILE,
  USER_CHANGE_EMAIL,
  USER_ADD_CART,
  USER_ADD_FAVORITES,
  GET_ALL_BRANDS,
  GET_ALL_CATEGORY,
  GET_ALL_SUBCATEGORY,
  PRODUCT_ADD,
  CLEAR_PRODUCT_ADD,
  GET_PRODUCT_PAGINATE,
  REMOVE_PRODUCT,
  GET_PRODUCT_BY_ID,
  CLEAR_PRODUCT_EDIT,
  SET_SEARCH_KEYWORDS,
  RESET_SEARCH,
  GET_PRODUCT_BY_CATEGORY,
  CATEGORY_ADD,
  SUBCATEGORY_ADD,
  BRAND_ADD,
  CLEAR_PRODUCT,
  ORDER_ADD,
  UPDATE_CART,
  GET_CATEGORY_PAGINATE,
  REMOVE_CATEGORY,
  GET_ORDERS_PAGINATE,
  GET_CATEGORY_BY_ID,
  CLEAR_CATEGORY_EDIT,
  GET_BRAND_PAGINATE,
  REMOVE_BRAND,
  GET_BRAND_BY_ID,
  CLEAR_BRAND_EDIT,
  REMOVE_ORDER,
  GET_SUBCATEGORY_PAGINATE,
  REMOVE_SUBCATEGORY,
  GET_SUBCATEGORY_BY_ID,
  CLEAR_SUBCATEGORY_EDIT,
  UPDATE_USER_HISTORY,
  GET_PRODUCT_BY_NAME,
  GET_SITE_VARS,
  UPDATE_SITE_VARS,
  GET_ORDER_BY_ID,
  RETUR_ADD,
  GET_ALL_RETURS,
  GET_RETUR_PAGINATE,
  REMOVE_RETUR,
  GET_RETUR_BY_ID,
  CLEAR_RETUR_EDIT,
  APPLY_DISCOUNT,
  ALL_DISCOUNTS,
  DISCOUNT_ADD,
  GET_DISCOUNT_PAGINATE,
  REMOVE_DISCOUNT,
  GET_DISCOUNT_BY_ID,
  CLEAR_DISCOUNT_EDIT,
  TOTAL_WITH_DISCOUNT,
  GET_ALL_ORDERS,
  GET_ALL_USERS,
  GET_ALL_ORDER_DETAIL,
  RESET_PASSWORD,
  SEND_EMAIL,
} from "../types";

export const userAuth = (user) => ({
  type: AUTH_USER,
  payload: user,
});
export const sentEmail = (email) => ({
  type: SEND_EMAIL,
  payload: email,
});
export const resetPassword = (data) => ({
  type: RESET_PASSWORD,
  payload: data,
});
export const userSignOut = () => ({
  type: SIGN_OUT,
});

export const userType = (user) => ({
  type: USER_TYPE,
  payload: user,
});

export const getAllUsers = (user) => ({
  type: GET_ALL_USERS,
  payload: user,
});
export const userUpdateProfile = (userdata) => ({
  type: UPDATE_USER_PROFILE,
  payload: userdata,
});

export const userChangeEmail = (data) => ({
  type: USER_CHANGE_EMAIL,
  payload: data,
});

export const userAddCart = (data) => ({
  type: USER_ADD_CART,
  payload: data,
});
export const updateCart = (data) => ({
  type: UPDATE_CART,
  payload: data,
});
export const userAddFavorites = (data) => ({
  type: USER_ADD_FAVORITES,
  payload: data,
});

export const productsByDate = (data) => ({
  type: GET_PROD_BY_DATE,
  payload: data,
});

export const errorGlobal = (msg) => ({
  type: ERROR_GLOBAL,
  payload: msg,
});

export const successGlobal = (msg) => ({
  type: SUCCESS_GLOBAL,
  payload: msg,
});
export const clearNotification = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_NOTIFICATION,
    });
  };
};
export const getAllBrands = (brand) => ({
  type: GET_ALL_BRANDS,
  payload: brand,
});

export const getAllCategory = (category) => ({
  type: GET_ALL_CATEGORY,
  payload: category,
});

export const getAllSubcategory = (subcategory) => ({
  type: GET_ALL_SUBCATEGORY,
  payload: subcategory,
});
export const getAllOrders = (order) => ({
  type: GET_ALL_ORDERS,
  payload: order,
});
export const getAllOrderDetail = (order) => ({
  type: GET_ALL_ORDER_DETAIL,
  payload: order,
});
export const productAdd = (product) => ({
  type: PRODUCT_ADD,
  payload: product,
});

export const categoryAdd = (category) => ({
  type: CATEGORY_ADD,
  payload: category,
});
export const subcategoryAdd = (subcategory) => ({
  type: SUBCATEGORY_ADD,
  payload: subcategory,
});

export const brandAdd = (brand) => ({
  type: BRAND_ADD,
  payload: brand,
});
export const clearProductAdd = () => {
  return {
    type: CLEAR_PRODUCT_ADD,
  };
};

export const productsByPaginate = (products) => ({
  type: GET_PRODUCT_PAGINATE,
  payload: products,
});
export const categoryByPaginate = (category) => ({
  type: GET_CATEGORY_PAGINATE,
  payload: category,
});
export const brandByPaginate = (brand) => ({
  type: GET_BRAND_PAGINATE,
  payload: brand,
});
export const ordersByPaginate = (orders) => ({
  type: GET_ORDERS_PAGINATE,
  payload: orders,
});
export const subcategoryByPaginate = (subcategory) => ({
  type: GET_SUBCATEGORY_PAGINATE,
  payload: subcategory,
});
export const productRemove = () => ({
  type: REMOVE_PRODUCT,
});
export const orderRemove = () => ({
  type: REMOVE_ORDER,
});
export const categoryRemove = () => ({
  type: REMOVE_CATEGORY,
});
export const brandRemove = () => ({
  type: REMOVE_BRAND,
});
export const subcategoryRemove = () => ({
  type: REMOVE_SUBCATEGORY,
});
export const productsById = (product) => ({
  type: GET_PRODUCT_BY_ID,
  payload: product,
});
export const categoryById = (category) => ({
  type: GET_CATEGORY_BY_ID,
  payload: category,
});
export const brandById = (brand) => ({
  type: GET_BRAND_BY_ID,
  payload: brand,
});
export const subcategoryById = (subcategory) => ({
  type: GET_SUBCATEGORY_BY_ID,
  payload: subcategory,
});
export const productsByCategory = (category) => ({
  type: GET_PRODUCT_BY_CATEGORY,
  payload: category,
});

export const clearProductEdit = () => ({
  type: CLEAR_PRODUCT_EDIT,
});
export const clearCategoryEdit = () => ({
  type: CLEAR_CATEGORY_EDIT,
});
export const clearBrandEdit = () => ({
  type: CLEAR_BRAND_EDIT,
});
export const clearSubcategoryEdit = () => ({
  type: CLEAR_SUBCATEGORY_EDIT,
});
export const clearProduct = () => ({
  type: CLEAR_PRODUCT,
});
export const setSearchKeywords = (keywords) => ({
  type: SET_SEARCH_KEYWORDS,
  payload: keywords,
});

export const resetSearch = () => ({
  type: RESET_SEARCH,
});

export const applyDiscount = (value) => ({
  type: APPLY_DISCOUNT,
  payload: value,
});

export const orderAdd = (user) => ({
  type: ORDER_ADD,
  payload: user,
});

export const updateUserHistory = (userdata) => ({
  type: UPDATE_USER_HISTORY,
  payload: userdata,
});
export const productsByName = (id, name) => ({
  type: GET_PRODUCT_BY_NAME,
  payload: { id, name },
});

export const siteGetVars = (site) => ({
  type: GET_SITE_VARS,
  payload: site,
});

export const updateSiteVars = (vars) => ({
  type: UPDATE_SITE_VARS,
  payload: vars,
});
export const orderById = (order) => ({
  type: GET_ORDER_BY_ID,
  payload: order,
});

export const returAdd = (retur) => ({
  type: RETUR_ADD,
  payload: retur,
});
export const getAllReturs = (retur) => ({
  type: GET_ALL_RETURS,
  payload: retur,
});
export const returByPaginate = (retur) => ({
  type: GET_RETUR_PAGINATE,
  payload: retur,
});
export const returRemove = () => ({
  type: REMOVE_RETUR,
});
export const returById = (retur) => ({
  type: GET_RETUR_BY_ID,
  payload: retur,
});
export const clearReturEdit = () => ({
  type: CLEAR_RETUR_EDIT,
});
export const getAllDiscounts = (discount) => ({
  type: ALL_DISCOUNTS,
  payload: discount,
});
export const discountAdd = (discount) => ({
  type: DISCOUNT_ADD,
  payload: discount,
});
export const discountByPaginate = (discount) => ({
  type: GET_DISCOUNT_PAGINATE,
  payload: discount,
});
export const discountRemove = () => ({
  type: REMOVE_DISCOUNT,
});
export const discountById = (discount) => ({
  type: GET_DISCOUNT_BY_ID,
  payload: discount,
});
export const clearDiscountEdit = () => ({
  type: CLEAR_DISCOUNT_EDIT,
});
export const discountApplied = (discount, totalWithDiscount) => ({
  type: APPLY_DISCOUNT,
  payload: { discount, totalWithDiscount },
});
export const TotalWithDiscount = (totalWithDiscount) => ({
  type: TOTAL_WITH_DISCOUNT,
  payload: totalWithDiscount,
});
