import React from "react";

import { Table, Pagination, Modal, Button } from "react-bootstrap";
import Loader from "../../../utils/loader";

const BrandsTable = ({
  brands,
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
      {brands && brands.docs ? (
        <>
          <div className="table-container">
            <Table striped border="true" hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {brands.docs.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
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
              {brands.hasPrevPage ? (
                <>
                  <Pagination.Prev
                    onClick={() => goToPrevPage(brands.prevPage)}
                  />
                  <Pagination.Item
                    onClick={() => goToPrevPage(brands.prevPage)}
                  >
                    {brands.prevPage}
                  </Pagination.Item>
                </>
              ) : null}
              <Pagination.Item active>{brands.page}</Pagination.Item>
              {brands.hasNextPage ? (
                <>
                  <Pagination.Item
                    onClick={() => goToNextPage(brands.nextPage)}
                  >
                    {brands.nextPage}
                  </Pagination.Item>
                  <Pagination.Next
                    onClick={() => goToNextPage(brands.nextPage)}
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

export default BrandsTable;
