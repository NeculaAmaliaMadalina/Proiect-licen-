import React, { useEffect, useState } from "react";
import AdminLayout from "../admin_navigation/admin_layout";
import OrdersTable from "./order_table";
import { useDispatch, useSelector } from "react-redux";
import { ordersByPaginate } from "../../../store/actions/order.action";
import { orderRemove } from "../../../store/actions/order.action";

const AdminOrders = (props) => {
  const dispatch = useDispatch();
  const [removeModal, setRemoveModal] = useState(false);
  const [toRemove, setToRemove] = useState(null);
  const [searchValues, setSearchValues] = useState({ page: 1 });
  const notifications = useSelector((state) => state.notifications);
  const order = useSelector((state) => state.order.byPaginate);

  const goToPage = (page) => {
    dispatch(ordersByPaginate({ ...searchValues, page }));
  };
  const handleClose = () => {
    setRemoveModal(false);
  };
  const handleModal = (id) => {
    setToRemove(id);
    setRemoveModal(true);
  };
  const handleRemove = () => {
    dispatch(orderRemove(toRemove));
  };
  useEffect(() => {
    dispatch(ordersByPaginate());
  }, [dispatch, notifications]);

  useEffect(() => {
    handleClose();
    setRemoveModal(false);
    if (notifications && notifications.removeArticle) {
      dispatch(ordersByPaginate());
    }
  }, [dispatch, notifications]);
  return (
    <AdminLayout title="Products">
      <div className="content-container">
        <div className="products_table">
          <OrdersTable
            removeModal={removeModal}
            order={order}
            prev={(page) => goToPage(page)}
            next={(page) => goToPage(page)}
            handleClose={() => handleClose()}
            handleModal={(id) => handleModal(id)}
            handleRemove={() => handleRemove()}
            fetchOrders={() => ordersByPaginate()}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
