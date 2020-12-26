import React, { useState } from "react";
import { Form } from "react-bootstrap";
import CustomModal from "../../../UI/CustomModal";

function AddCategoryModal(props) {
  const { show, handleCloseAddModal, renderOptions, handleSubmitAdd } = props;
  // for add item
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  // handle add image for category
  const handleCategoryImage = (e) => {
    console.log(e.target.files[0]);
    setCategoryImage(e.target.files[0]);
  };

  // submit add
  const handleAddCategory = () => {
    const form = new FormData();

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    setCategoryName("");
    setParentCategoryId("");
    setCategoryImage("");

    handleSubmitAdd(form);
  };

  return (
    <CustomModal
      size="md"
      show={show}
      handleClose={handleCloseAddModal}
      handleSubmitForm={handleAddCategory}
      title="Add Category"
      btnText="Save"
    >
      <Form>
        <Form.Group>
          <Form.Label>Category Name</Form.Label>
          <input
            className="form-control"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            type="text"
            placeholder="Category"
          />
        </Form.Group>

        <Form.Group>
          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Select Category</Form.Label>
          <select
            className="form-control"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option value="">Select Parent Category</option>
            {renderOptions}
          </select>
        </Form.Group>
      </Form>
    </CustomModal>
  );
}

export default AddCategoryModal;
