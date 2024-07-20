import React, { useEffect, useState } from "react";
import OrdersChart from "./charts/totalOrder";
import UsersPie from "./charts/numberOfUser";
import NumberOfReturs from "./charts/numberOfReturs";
import { getAllUsers } from "../../store/actions/user.actions";
import { getAllOrders } from "../../store/actions/order.action";
import { getAllOrderDetail } from "../../store/actions/order.action";
import { getAllReturs } from "../../store/actions/retur.action";
import OrdersPaymentMethodPieChart from "./charts/methodOfPay";
import DiscountUsagePage from "./charts/discountUsage";
import BrandOrderChart from "./charts/brandOrders";
import CategoryOrderChart from "./charts/categoryOrder";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../admin-dashboard/admin_navigation/admin_layout";
import { Modal } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.order.all);
  const allUsers = useSelector((state) => state.users.all);
  const allOrderDetail = useSelector((state) => state.order.allDetail);
  const allReturs = useSelector((state) => state.returs.all);
  const [modalShow, setModalShow] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);

  const sliderSetting = {
    dot: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleOpenModal = (chart) => {
    setSelectedChart(chart);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setSelectedChart(null);
  };

  useEffect(() => {
    if (allUsers.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, allUsers]);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllOrderDetail());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllReturs());
  }, [dispatch]);

  return (
    <AdminLayout>
      <div className="content-container-graph">
        <div className="chart-container">
          <OrdersChart
            ordersData={allOrders}
            onClick={() => handleOpenModal("orders")}
          />
          <OrdersPaymentMethodPieChart
            ordersData={allOrderDetail}
            onClick={() => handleOpenModal("payment")}
          />
          <BrandOrderChart onClick={() => handleOpenModal("brand")} />
        </div>
        <div className="chart-container">
          <NumberOfReturs
            allReturs={allReturs}
            onClick={() => handleOpenModal("returs")}
          />
          <UsersPie
            allUsers={allUsers}
            onClick={() => handleOpenModal("users")}
          />
        </div>
        <div className="chart-container">
          <DiscountUsagePage onClick={() => handleOpenModal("discount")} />
          <CategoryOrderChart onClick={() => handleOpenModal("category")} />
        </div>
      </div>
      <Modal
        show={modalShow}
        onHide={handleCloseModal}
        dialogClassName="modal-custom"
        centered
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <Slider {...sliderSetting}>
            {selectedChart === "orders" && (
              <OrdersChart ordersData={allOrders} />
            )}
            {selectedChart === "payment" && (
              <OrdersPaymentMethodPieChart ordersData={allOrderDetail} />
            )}
            {selectedChart === "brand" && <BrandOrderChart />}
            {selectedChart === "returs" && (
              <NumberOfReturs allReturs={allReturs} />
            )}
            {selectedChart === "users" && <UsersPie allUsers={allUsers} />}
            {selectedChart === "discount" && <DiscountUsagePage />}
            {selectedChart === "category" && <CategoryOrderChart />}
          </Slider>
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
};

export default AdminDashboard;
