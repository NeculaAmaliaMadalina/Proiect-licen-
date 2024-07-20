import React from "react";

import { Table, Pagination, Modal, Button } from "react-bootstrap";
import Loader from "../../../utils/loader";

const CategoryTable = ({
  category,
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
      {category && category.docs ? (
        <>
          <div className="table-container">
            <Table striped border="true" hover className="table-lg">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {category.docs.map((item) => (
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
              {category.hasPrevPage ? (
                <>
                  <Pagination.Prev
                    onClick={() => goToPrevPage(category.prevPage)}
                  />
                  <Pagination.Item
                    onClick={() => goToPrevPage(category.prevPage)}
                  >
                    {category.prevPage}
                  </Pagination.Item>
                </>
              ) : null}
              <Pagination.Item active>{category.page}</Pagination.Item>
              {category.hasNextPage ? (
                <>
                  <Pagination.Item
                    onClick={() => goToNextPage(category.nextPage)}
                  >
                    {category.nextPage}
                  </Pagination.Item>
                  <Pagination.Next
                    onClick={() => goToNextPage(category.nextPage)}
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

export default CategoryTable;
