import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsByPaginate } from "../../store/actions/product.action";
import { getAllBrands } from "../../store/actions/brand";
import { getAllCategory } from "../../store/actions/category.action";
import { getAllSubcategory } from "../../store/actions/subcategory.action";
import RangeFilter from "./range";

import CardBlock from "../../utils/products/card.blocks";
import CollapseCheckbox from "./collapseCheckbox";
import PaginationComponent from "../../utils/paginateNav";
import GridOffIcon from "@mui/icons-material/GridOff";
import GridOnIcon from "@mui/icons-material/GridOn";

const defaultValues = {
  keywords: "",
  brand: [],
  category: [],
  subcategory: [],
  min: 0,
  max: 2000000,
  page: 1,
};

const ProductsShop = () => {
  const [grid, setGrid] = useState(false);
  const [search, setSearch] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    defaultValues
  );
  const { byPaginate } = useSelector((state) => state.products);
  const brands = useSelector((state) => state.brands);
  const category = useSelector((state) => state.category);
  const subcategory = useSelector((state) => state.subcategory);
  const dispatch = useDispatch();
  const handleGrid = () => setGrid(!grid);

  const goToPage = (page) => {
    setSearch({ page: page });
  };
  const handleResetSearch = () => {
    setSearch({ keywords: "", page: 1 });
  };

  const handleFilters = (filters, type) => {
    if (type === "brands") {
      setSearch({ brand: filters, page: 1 });
    }
    if (type === "category") {
      setSearch({ category: filters, page: 1 });
    }
    if (type === "subcategory") {
      setSearch({ subcategory: filters, page: 1 });
    }
  };

  const handleRange = (values) => {
    setSearch({ min: values[0], max: values[1], page: 1 });
  };
  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllSubcategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(productsByPaginate(search));
  }, [search, dispatch]);

  return (
    <div className="page_container">
      <div className="container_products">
        <div className="shop_wrapper">
          <div className="left_prod">
            <CollapseCheckbox
              initState={true}
              title="Brands"
              list={brands.all}
              handleFilters={(filters) => handleFilters(filters, "brands")}
            />
            <CollapseCheckbox
              initState={true}
              title="Category"
              list={category.all}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
            <CollapseCheckbox
              initState={true}
              title="Subcategory"
              list={subcategory.all}
              handleFilters={(filters) => handleFilters(filters, "subcategory")}
            />
            <RangeFilter
              initState={true}
              title="Price range"
              handleRange={(values) => handleRange(values)}
            />
          </div>
          <div className="right">
            <div className="shop">
              <div className="shop_grid_clear">
                <div
                  className={`grid_btn ${grid ? "" : "active"}`}
                  onClick={() => handleGrid()}
                >
                  <GridOnIcon />
                </div>
                <div
                  className={`grid_btn ${!grid ? "" : "active"}`}
                  onClick={() => handleGrid()}
                >
                  <GridOffIcon />
                </div>
              </div>
              <div>
                {byPaginate && byPaginate.docs ? (
                  <>
                    <CardBlock
                      grid={grid}
                      items={byPaginate.docs}
                      shop={true}
                    />
                    <PaginationComponent
                      prods={byPaginate}
                      prev={(page) => goToPage(page)}
                      next={(page) => goToPage(page)}
                      resetSearch={() => handleResetSearch()}
                    />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsShop;
