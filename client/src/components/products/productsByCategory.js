import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByCategory } from "../../store/actions/product.action";
import { getAllBrands } from "../../store/actions/brand";
import { getAllSubcategory } from "../../store/actions/subcategory.action";
import RangeFilter from "./range";
import { useParams } from "react-router-dom";
import CardBlock from "../../utils/products/card.blocks";
import CollapseCheckbox from "./collapseCheckbox";
import PaginationComponent from "../../utils/paginateNav";
import GridOffIcon from "@mui/icons-material/GridOff";
import GridOnIcon from "@mui/icons-material/GridOn";

const defaultValues = {
  keywords: "",
  brand: [],
  subcategory: [],
  min: 0,
  max: 2000000,
  page: 1,
};

const ProductsByCategory = () => {
  const [grid, setGrid] = useState(false);
  const [search, setSearch] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    defaultValues
  );
  const byCategory = useSelector((state) => state.products.byCategory);
  const brands = useSelector((state) => state.brands);
  const subcategory = useSelector((state) => state.subcategory);
  const dispatch = useDispatch();
  const { category } = useParams();

  const goToPage = (page) => {
    setSearch({ page: page });
  };

  const handleResetSearch = () => {
    setSearch({ ...search, keywords: "", page: 1 });
  };

  const handleFilters = (filters, type) => {
    if (type === "brands") {
      setSearch({ brand: filters, page: 1 });
    }
    if (type === "category") {
      setSearch({ category: category, page: 1 });
    }
    if (type === "subcategory") {
      setSearch({ subcategory: filters, page: 1 });
    }
  };

  const handleRange = (values) => {
    setSearch({ ...search, min: values[0], max: values[1], page: 1 });
  };
  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllSubcategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductByCategory(category, search));
  }, [dispatch, category, search]);

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
                  onClick={() => setGrid(!grid)}
                >
                  <GridOnIcon />
                </div>
                <div
                  className={`grid_btn ${!grid ? "" : "active"}`}
                  onClick={() => setGrid(!grid)}
                >
                  <GridOffIcon />
                </div>
              </div>
              <div>
                {byCategory && byCategory.docs ? (
                  <>
                    <CardBlock
                      grid={grid}
                      items={byCategory.docs}
                      shop={true}
                    />
                    <PaginationComponent
                      prods={byCategory}
                      prev={(page) => goToPage(page)}
                      next={(page) => goToPage(page)}
                      resetSearch={handleResetSearch}
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

export default ProductsByCategory;
