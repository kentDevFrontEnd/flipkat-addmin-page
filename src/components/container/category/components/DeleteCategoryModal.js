import React from "react";
import { Col, Row } from "react-bootstrap";
import CustomModal from "../../../UI/CustomModal";

function DeleteCategoryModal(props) {
  const {
    showDel,
    checkedArr,
    expandedArr,
    handleCloseDel,
    handleDeleteCategory,
  } = props;
  return (
    <CustomModal
      size="md"
      show={showDel}
      handleClose={handleCloseDel}
      handleSubmitForm={handleDeleteCategory}
      title="Are you sure delete items"
      btnText="Save"
      buttons={[
        {
          label: "No",
          variant: "info",
          onClick: handleCloseDel,
        },
        {
          label: "Yes",
          variant: "danger",
          onClick: handleDeleteCategory,
        },
      ]}
    >
      <h5>Expanded Items</h5>
      {expandedArr.length > 0 &&
        expandedArr.map((item, index) => (
          <Row key={item.value}>
            <Col>{item.name}</Col>
          </Row>
        ))}
      <h5>Deleted Items</h5>
      {checkedArr.length > 0 &&
        checkedArr.map((item, index) => (
          <Row key={item.value}>
            <Col>{item.name}</Col>
          </Row>
        ))}
    </CustomModal>
  );
}

export default DeleteCategoryModal;
