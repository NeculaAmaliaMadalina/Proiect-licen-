import React from "react";

import { Table, Pagination, Modal, Button } from "react-bootstrap";
import Loader from "../../../utils/loader";

const DiscountTable = ({
  discount,
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
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("ro-RO");
  };
  return (
    <>
      {discount && discount.docs ? (
        <>
          <div className="table-container">
            <Table striped border="true" hover>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Value</th>
                  <th>Type</th>
                  <th>Minimum amount</th>
                  <th>Valid from</th>
                  <th>Valid until</th>
                </tr>
              </thead>
              <tbody>
                {discount.docs.map((item) => (
                  <tr key={item._id}>
                    <td>{item.code}</td>
                    <td>{item.value}</td>
                    <td>{item.type}</td>
                    <td>{item.minimumAmount}</td>
                    <td>{formatDate(item.validFrom)}</td>
                    <td>{formatDate(item.validUntil)}</td>
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
              {discount.hasPrevPage ? (
                <>
                  <Pagination.Prev
                    onClick={() => goToPrevPage(discount.prevPage)}
                  />
                  <Pagination.Item
                    onClick={() => goToPrevPage(discount.prevPage)}
                  >
                    {discount.prevPage}
                  </Pagination.Item>
                </>
              ) : null}
              <Pagination.Item active>{discount.page}</Pagination.Item>
              {discount.hasNextPage ? (
                <>
                  <Pagination.Item
                    onClick={() => goToNextPage(discount.nextPage)}
                  >
                    {discount.nextPage}
                  </Pagination.Item>
                  <Pagination.Next
                    onClick={() => goToNextPage(discount.nextPage)}
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

export default DiscountTable;
