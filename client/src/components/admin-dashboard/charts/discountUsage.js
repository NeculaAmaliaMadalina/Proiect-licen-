import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../store/actions/order.action";
import { getAllDiscounts } from "../../../store/actions/discount.actions";

const DiscountUsagePage = ({ onClick }) => {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.order.allDetail);
  const discounts = useSelector((state) => state.discount.all);
  const [discountUsage, setDiscountUsage] = useState({});
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllDiscounts());
  }, [dispatch]);
  useEffect(() => {
    const calculateDiscountUsage = () => {
      if (!allOrders || !discounts) return;

      const usageCounts = {};

      discounts.forEach((discount) => {
        usageCounts[discount.code] = 0;
      });

      allOrders.forEach((order) => {
        if (order.discountCart) {
          const discountId = order.discountCart;
          const discount = discounts.find(
            (discount) => discount._id === discountId
          );
          if (discount) {
            const discountCode = discount.code;
            usageCounts[discountCode] += 1;
          }
        }
      });

      setDiscountUsage(usageCounts);
    };

    calculateDiscountUsage();
  }, [allOrders, discounts]);

  const chartData = {
    labels: Object.keys(discountUsage),
    datasets: [
      {
        label: "Utilizări",
        data: Object.values(discountUsage),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Utilizare discounturi",
        font: {
          size: 20,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  const handleChartClick = () => {
    onClick && onClick();
  };
  return (
    <div className="graph" onClick={handleChartClick}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default DiscountUsagePage;
