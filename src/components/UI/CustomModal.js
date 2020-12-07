import React from "react";
import { Button, Modal } from "react-bootstrap";

function CustomModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} style={{ top: "50px" }}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={props.handleSubmitForm}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
