const express = require("express");
const authRoute = require("./auth.route");
const usersRoute = require("./user.route");
const brandsRoute = require("./brand.route");
const productsRoute = require("./product.route");
const siteRoute = require("./site.route");
const categoryRoute = require("./category.route");
const subcategoryRoute = require("./subcategory.route");
const orderRoute = require("./order.route");
const returRoute = require("./retur.route");
const discountRoute = require("./discount.route");
const router = express.Router();

const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: usersRoute,
  },
  {
    path: "/brands",
    route: brandsRoute,
  },
  {
    path: "/products",
    route: productsRoute,
  },
  {
    path: "/site",
    route: siteRoute,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
  {
    path: "/subcategory",
    route: subcategoryRoute,
  },
  {
    path: "/order",
    route: orderRoute,
  },
  {
    path: "/retur",
    route: returRoute,
  },
  {
    path: "/discount",
    route: discountRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
