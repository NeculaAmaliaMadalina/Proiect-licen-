import React from "react";

import { Table, Pagination, Modal, Button } from "react-bootstrap";
import Moment from "react-moment";
import Loader from "../../../utils/loader";

const ProductsTable = ({
  prods,
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
      {prods && prods.docs ? (
        <>
          <div className="table-container">
            <Table striped border="true" hover>
              <thead>
                <tr>
                  <th>Created</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                  <th>Available</th>
                </tr>
              </thead>
              <tbody>
                {prods.docs.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <Moment to={item.date}></Moment>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.category.name}</td>
                    <td>
                      {item.subcategory ? (
                        <span>{item.subcategory.name}</span>
                      ) : (
                        <span>N/A</span>
                      )}
                    </td>
                    <td>{item.available}</td>
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
              {prods.hasPrevPage ? (
                <>
                  <Pagination.Prev
                    onClick={() => goToPrevPage(prods.prevPage)}
                  />
                  <Pagination.Item onClick={() => goToPrevPage(prods.prevPage)}>
                    {prods.prevPage}
                  </Pagination.Item>
                </>
              ) : null}
              <Pagination.Item active>{prods.page}</Pagination.Item>
              {prods.hasNextPage ? (
                <>
                  <Pagination.Item onClick={() => goToNextPage(prods.nextPage)}>
                    {prods.nextPage}
                  </Pagination.Item>
                  <Pagination.Next
                    onClick={() => goToNextPage(prods.nextPage)}
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

export default ProductsTable;
