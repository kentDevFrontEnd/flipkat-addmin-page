import React from "react";
import { Button, Modal } from "react-bootstrap";

function CustomModal(props) {
  return (
    <Modal
      size={props.size}
      show={props.show}
      onHide={props.handleClose}
      style={{ top: "50px" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          onClick={props.handleSubmitForm}
        >
          {props.btnText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
