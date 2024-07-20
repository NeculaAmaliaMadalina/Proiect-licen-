import React from "react";

import { Table, Pagination, Modal, Button } from "react-bootstrap";
import Moment from "react-moment";
import Loader from "../../../utils/loader";

const ReturTable = ({
  retur,
  prev,
  next,
  goToEdit,
  removeModal,
  handleClose,
  handleModal,
  handleRemove,
}) => {
  const goToPrevPage = (page) => {
    prev(page);
  };

  const goToNextPage = (page) => {
    next(page);
  };
  return (
    <>
      {retur && retur.docs ? (
        <>
          <div className="table-container">
            <Table striped border="true" hover>
              <thead>
                <tr>
                  <th>Created</th>
                  <th>User Id</th>
                  <th>Order id</th>
                  <th>Bank account</th>
                  <th>Product id</th>
                  <th>Reason</th>
                  <th>Observations</th>
                </tr>
              </thead>
              <tbody>
                {retur.docs.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <Moment to={item.date}></Moment>
                    </td>
                    <td>{item.userId}</td>
                    <td>{item.orderId}</td>
                    <td>{item.bankAccount}</td>
                    <td>{item.product}</td>
                    <td>{item.returnReason}</td>
                    <td>{item.observations}</td>
                    <td
                      className="action_btn remove_button"
                      onClick={() => handleModal(item._id)}
                    >
                      Remove
                    </td>
                    <td
                      className="action_btn edit_button"
                      onClick={() => goToEdit(item._id)}
                    >
                      Edit
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              {retur.hasPrevPage ? (
                <>
                  <Pagination.Prev
                    onClick={() => goToPrevPage(retur.prevPage)}
                  />
                  <Pagination.Item onClick={() => goToPrevPage(retur.prevPage)}>
                    {retur.prevPage}
                  </Pagination.Item>
                </>
              ) : null}
              <Pagination.Item active>{retur.page}</Pagination.Item>
              {retur.hasNextPage ? (
                <>
                  <Pagination.Item onClick={() => goToNextPage(retur.nextPage)}>
                    {retur.nextPage}
                  </Pagination.Item>
                  <Pagination.Next
                    onClick={() => goToNextPage(retur.nextPage)}
                  />
                </>
              ) : null}
            </Pagination>
          </div>
        </>
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

export default ReturTable;
