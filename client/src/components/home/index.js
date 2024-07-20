import React, { useEffect } from "react";
import Featured from "./featured";
import Loader from "../../utils/loader";
import { useDispatch, useSelector } from "react-redux";
import { productsByDate } from "../../store/actions/product.action";
import CardBlock from "../../utils/products/card.blocks";

const Home = () => {
  const { byDate } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsByDate({ limit: 8, sortBy: "date", order: "desc" }));
  }, [dispatch]);

  return (
    <div>
      <Featured />

      {byDate ? <CardBlock items={byDate} title="NOUTĂȚI" /> : <Loader />}
    </div>
  );
};

export default Home;
