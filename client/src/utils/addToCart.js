import React from "react";

import { Modal, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AddToCard = ({ modal, handleClose, errorType }) => {
  return (
    <>
      <Modal show={modal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorType === "auth" ? (
            <div>You need to register </div>
          ) : (
            <div>You need to verify your account</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {errorType === "auth" ? (
            <LinkContainer to="/sign_in">
              <Button variant="primary">Sign in</Button>
            </LinkContainer>
          ) : (
            <Button variant="primary" onClick={() => alert("trigger")}>
              Send email verification again
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddToCard;
