import React, { useEffect } from "react";
import { Table, Pagination, Modal, Button } from "react-bootstrap";
import Moment from "react-moment";
import Loader from "../../../utils/loader";

const OrdersTable = ({
  order,
  prev,
  next,
  removeModal,
  handleClose,
  handleModal,
  handleRemove,
  fetchOrders,
}) => {
  const goToPrevPage = (page) => {
    prev(page);
  };

  const goToNextPage = (page) => {
    next(page);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {order && order.docs ? (
        <div className="table-container">
          <Table striped bordered hover responsive="xl" className="table-lg">
            <thead>
              <tr>
                <th>Order number</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>City</th>
                <th>Method</th>
                <th>Subtotal</th>
                <th>Id discount</th>
                <th>Total</th>
                <th>Order date</th>
              </tr>
            </thead>
            <tbody>
              {order.docs.map((item) => (
                <React.Fragment key={item._id}>
                  {item.products.map((product) => (
                    <tr key={`${item._id}-${product.item}`}>
                      <td>{item._id}</td>
                      <td>
                        {item.products.map((product, i) => (
                          <div key={i}>
                            <>{product.item}</>
                          </div>
                        ))}
                      </td>
                      <td>
                        {item.products.map((product, i) => (
                          <div key={i}>
                            <>{product.quantity}</>
                          </div>
                        ))}
                      </td>
                      <td>{item.contactInfo.email}</td>
                      <td>{item.contactInfo.phone}</td>
                      <td>{item.contactInfo.county}</td>
                      <td>{item.contactInfo.city}</td>
                      <td>{item.paymentInfo.method}</td>
                      <td>{item.totalAmount}</td>
                      <td>{item.discountCart}</td>
                      <td>{item.totalWithDiscount}</td>
                      <td>
                        <Moment format="YYYY/MM/DD HH:mm">
                          {item.orderDate}
                        </Moment>
                      </td>
                      <td
                        className="action_btn remove_button"
                        onClick={() => handleModal(item._id)}
                      >
                        Remove
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {order.hasPrevPage && (
              <>
                <Pagination.Prev onClick={() => goToPrevPage(order.prevPage)} />
                <Pagination.Item onClick={() => goToPrevPage(order.prevPage)}>
                  {order.prevPage}
                </Pagination.Item>
              </>
            )}
            <Pagination.Item active>{order.page}</Pagination.Item>
            {order.hasNextPage && (
              <>
                <Pagination.Item onClick={() => goToNextPage(order.nextPage)}>
                  {order.nextPage}
                </Pagination.Item>
                <Pagination.Next onClick={() => goToNextPage(order.nextPage)} />
              </>
            )}
          </Pagination>
        </div>
      ) : (
        <Loader />
      )}
      <Modal show={removeModal} onHide={handleClose} style={{ zIndex: 10000 }}>
        <Modal.Header closeButton>
          <Modal.Title>Are you really sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This will be delete permanently</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleRemove()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrdersTable;
