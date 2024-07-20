import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "./hoc/mainLayout";
import Loader from "./utils/loader";
import authGuardUser from "./hoc/authGuardUser";
import authGuardAdmin from "./hoc/authGuardAdmin";

import { useDispatch, useSelector } from "react-redux";
import {
  userIsAuth,
  userSignOut,
  userIsAdmin,
} from "./store/actions/user.actions";

import Header from "./components/navigation/header";
import Footer from "./components/navigation/footer";
import Home from "./components/home";
import RegisterLogin from "./components/auth/index";
import AdminDashboard from "./components/admin-dashboard/admin_dashboard";
import UserProfile from "./components/user_profile";
import userInfo from "./components/user_profile/info";
import AddProduct from "./components/admin-dashboard/admin_products/admin_add_products";
import AdminProducts from "./components/admin-dashboard/admin_products/products";
import EditProduct from "./components/admin-dashboard/admin_products/edit_product";
import ProductsShop from "./components/products";
import ProductsByCategory from "./components/products/productsByCategory";
import UserCart from "./components/user_profile/cart";
import UserFavoritesItem from "./components/user_profile/favorite";
import Delivery from "./components/navigation/delivery";
import Retur from "./components/navigation/retur";
import Confitentiality from "./components/navigation/confitentiality";
import AddCategory from "./components/admin-dashboard/category_subcategory.js/add_category_subcategory";
import Terms from "./components/navigation/terms";
import ProductDetail from "./components/detail_product";
import CompleteOrder from "./components/cart/complete_order";
import AdminCategory from "./components/admin-dashboard/category_subcategory.js/category";
import AdminOrders from "./components/admin-dashboard/order.js/order";
import EditCategory from "./components/admin-dashboard/category_subcategory.js/edit.category";
import EditBrands from "./components/admin-dashboard/category_subcategory.js/edit_brand";
import AdminBrands from "./components/admin-dashboard/category_subcategory.js/brand";
import AdminSubcategory from "./components/admin-dashboard/category_subcategory.js/subcategory";
import EditSubcategory from "./components/admin-dashboard/category_subcategory.js/edit_subcategory";
import SiteVars from "./components/admin-dashboard/site/siteVars";
import AddRetur from "./components/user_profile/retur";
import AdminRetur from "./components/admin-dashboard/admin_retur.js/retur";
import EditRetur from "./components/admin-dashboard/admin_retur.js/edit_retur";
import AdminDiscount from "./components/admin-dashboard/admin_discounts/discount";
import EditDiscount from "./components/admin-dashboard/admin_discounts/edit_discount";
import AddDiscount from "./components/admin-dashboard/admin_discounts/add_discount";
import ResetPasswordPage from "./components/auth/resetPassword";

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const UserProfileWithGuard = authGuardUser(UserProfile);
  const UserInfoWithGuard = authGuardUser(userInfo);
  const isAdmin = useSelector((state) => state.users.isAdmin);
  const isAuthenticated = useSelector((state) => state.users.auth);
  const AdminDashboardWithGuard = authGuardAdmin(AdminDashboard);
  const AddProductWithGuard = authGuardAdmin(AddProduct);
  const AdminProductsWithGuard = authGuardAdmin(AdminProducts);
  const EditProductWithGuard = authGuardAdmin(EditProduct);
  const AddCategoryWithGuard = authGuardAdmin(AddCategory);
  const UserCartWithGuart = authGuardUser(UserCart);
  const UserFavoritesItemWithGuart = authGuardUser(UserFavoritesItem);
  const AddReturWithGuard = authGuardUser(AddRetur);
  const AdminCategoryWithGuard = authGuardAdmin(AdminCategory);
  const AdminOrdersWithGuard = authGuardAdmin(AdminOrders);
  const EditCategorywithGuard = authGuardAdmin(EditCategory);
  const EditBrandsWithGuard = authGuardAdmin(EditBrands);
  const AdminBrandsWithGuard = authGuardAdmin(AdminBrands);
  const AdminSubcategoryWithGuard = authGuardAdmin(AdminSubcategory);
  const EditSubcategoryWithGuard = authGuardAdmin(EditSubcategory);
  const SiteVarsWithGuard = authGuardAdmin(SiteVars);
  const AdminReturWithGuard = authGuardAdmin(AdminRetur);
  const EditReturWithGuard = authGuardAdmin(EditRetur);
  const AdminDiscountWithGuard = authGuardAdmin(AdminDiscount);
  const EditDiscountWithGuard = authGuardAdmin(EditDiscount);
  const AddDiscountWithGuard = authGuardAdmin(AddDiscount);

  const signOutUser = () => {
    dispatch(userSignOut());
  };

  useEffect(() => {
    dispatch(userIsAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(userIsAdmin());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false);
    }
  }, [users]);

  useEffect(() => {
    if (users.isAdmin !== null) {
      setLoading(false);
    }
  }, [users]);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader full={true} />
      ) : (
        <>
          {/* <Header users={users} signOutUser={signOutUser} /> */}
          {isAuthenticated && isAdmin ? null : (
            <Header users={users} signOutUser={signOutUser} />
          )}
          <MainLayout>
            <Routes>
              <Route
                path="/profile/user/user_info"
                element={<UserInfoWithGuard />}
              />
              <Route path="/profile" element={<UserProfileWithGuard />} />
              <Route
                path="/profile/user/user_cart"
                element={<UserCartWithGuart />}
              />
              <Route
                path="profile/favorites"
                element={<UserFavoritesItemWithGuart />}
              />
              <Route
                path="profile/create_retur"
                element={<AddReturWithGuard />}
              />

              <Route path="/sign_in" element={<RegisterLogin />} />
              <Route path="/" element={<Home />} />
              <Route path="/products_shop" element={<ProductsShop />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/about_retur" element={<Retur />} />
              <Route
                path="/about_confitentiality"
                element={<Confitentiality />}
              />
              <Route path="/terms_and_conditions" element={<Terms />} />
              <Route path="/finalizare_comanda" element={<CompleteOrder />} />
              <Route path="/product_detail/:id" element={<ProductDetail />} />
              <Route
                path="/reset_password/:token"
                element={<ResetPasswordPage />}
              />

              <Route
                path="/admin_dashboard"
                element={<AdminDashboardWithGuard />}
              />
              <Route
                path="/admin_dashboard/add_product"
                element={<AddProductWithGuard />}
              />
              <Route
                path="/admin_dashboard/add_category"
                element={<AddCategoryWithGuard />}
              />
              <Route
                path="/admin_dashboard/add_discount"
                element={<AddDiscountWithGuard />}
              />

              <Route
                path="/admin_dashboard/admin_products"
                element={<AdminProductsWithGuard />}
              />
              <Route
                path="/admin_dashboard/admin_orders"
                element={<AdminOrdersWithGuard />}
              />
              <Route
                path="/admin_dashboard/admin_brands"
                element={<AdminBrandsWithGuard />}
              />

              <Route
                path="/admin_dashboard/admin_category"
                element={<AdminCategoryWithGuard />}
              />
              <Route
                path="/admin_dashboard/admin_subcategory"
                element={<AdminSubcategoryWithGuard />}
              />
              <Route
                path="/admin_dashboard/admin_returs"
                element={<AdminReturWithGuard />}
              />
              <Route
                path="/admin_dashboard/admin_discount"
                element={<AdminDiscountWithGuard />}
              />

              <Route
                path="/admin_dashboard/manage_site"
                element={<SiteVarsWithGuard />}
              />

              <Route
                path="/admin_dashboard/admin_products/edit_product/:id"
                element={<EditProductWithGuard />}
              />
              <Route
                path="/admin_dashboard/admin_category/edit_category/:id"
                element={<EditCategorywithGuard />}
              />
              <Route
                path="/admin_dashboard/admin_subcategory/edit_subcategory/:id"
                element={<EditSubcategoryWithGuard />}
              />

              <Route
                path="/admin_dashboard/admin_brands/edit_brand/:id"
                element={<EditBrandsWithGuard />}
              />
              <Route
                path="/admin_dashboard/admin_returs/edit_retur/:id"
                element={<EditReturWithGuard />}
              />
              <Route
                path="/admin_dashboard/admin_discount/edit_discount/:id"
                element={<EditDiscountWithGuard />}
              />

              <Route
                path="/products_shop/:category"
                element={<ProductsByCategory />}
              />
            </Routes>
          </MainLayout>
          {isAuthenticated && isAdmin ? null : <Footer />}
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
