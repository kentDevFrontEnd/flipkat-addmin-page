import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomModal from "../../../UI/CustomModal";

function UpdateCategoryModal(props) {
  const {
    showEdit,
    checkedArr,
    expandedArr,
    handleChange,
    renderOptions,
    handleEditCategory,
    handleCloseEditModal,
  } = props;
  return (
    <CustomModal
      size="lg"
      show={showEdit}
      handleClose={handleCloseEditModal}
      handleSubmitForm={handleEditCategory}
      title="Edit Category"
      btnText="Save"
    >
      <Form>
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
        {expandedArr.length > 0 &&
          expandedArr.map((item, index) => (
            <Row key={item.value}>
              <Col>
                <Form.Group>
                  <input
                    className="form-control"
                    value={item.name}
                    onChange={(e) =>
                      handleChange("name", e.target.value, index, "expanded")
                    }
                    type="text"
                    placeholder="Category"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <select
                    className="form-control"
                    value={item.parentId}
                    onChange={(e) =>
                      handleChange(
                        "parentId",
                        e.target.value,
                        index,
                        "expanded"
                      )
                    }
                  >
                    <option value="">Select Parent Category</option>
                    {renderOptions}
                  </select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <select
                    className="form-control"
                    value={item.type}
                    onChange={(e) =>
                      handleChange("type", e.target.value, index, "expanded")
                    }
                  >
                    <option value="">Select Type</option>
                    <option value="store">Store</option>
                    <option value="product">Product</option>
                    <option value="page">Page</option>
                  </select>
                </Form.Group>
              </Col>
            </Row>
          ))}
        <Row>
          <Col>
            <h6>Checked</h6>
          </Col>
        </Row>
        {checkedArr.length > 0 &&
          checkedArr.map((item, index) => (
            <Row key={item.value}>
              <Col>
                <Form.Group>
                  <input
                    className="form-control"
                    value={item.name}
                    onChange={(e) =>
                      handleChange("name", e.target.value, index, "checked")
                    }
                    type="text"
                    placeholder="Category"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <select
                    className="form-control"
                    value={item.parentId}
                    onChange={(e) =>
                      handleChange("parentId", e.target.value, index, "checked")
                    }
                  >
                    <option value="">Select Parent Category</option>
                    {renderOptions}
                  </select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <select
                    className="form-control"
                    value={item.type}
                    onChange={(e) =>
                      handleChange("type", e.target.value, index, "checked")
                    }
                  >
                    <option value="">Select Type</option>
                    <option value="store">Store</option>
                    <option value="product">Product</option>
                    <option value="page">Page</option>
                  </select>
                </Form.Group>
              </Col>
            </Row>
          ))}
      </Form>
    </CustomModal>
  );
}

export default UpdateCategoryModal;
