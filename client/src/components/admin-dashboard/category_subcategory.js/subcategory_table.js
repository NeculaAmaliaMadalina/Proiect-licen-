import React from "react";

import { Table, Pagination, Modal, Button } from "react-bootstrap";
import Loader from "../../../utils/loader";

const SubcategoryTable = ({
  subcategory,
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
      {subcategory && subcategory.docs ? (
        <>
          <div className="table-container">
            <Table striped border="true" hover className="table-lg">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Categories</th>
                </tr>
              </thead>
              <tbody>
                {subcategory.docs.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>
                      {item.category.map((_id) => (
                        <div key={_id}>{_id}</div>
                      ))}
                    </td>
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
              {subcategory.hasPrevPage ? (
                <>
                  <Pagination.Prev
                    onClick={() => goToPrevPage(subcategory.prevPage)}
                  />
                  <Pagination.Item
                    onClick={() => goToPrevPage(subcategory.prevPage)}
                  >
                    {subcategory.prevPage}
                  </Pagination.Item>
                </>
              ) : null}
              <Pagination.Item active>{subcategory.page}</Pagination.Item>
              {subcategory.hasNextPage ? (
                <>
                  <Pagination.Item
                    onClick={() => goToNextPage(subcategory.nextPage)}
                  >
                    {subcategory.nextPage}
                  </Pagination.Item>
                  <Pagination.Next
                    onClick={() => goToNextPage(subcategory.nextPage)}
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

export default SubcategoryTable;
