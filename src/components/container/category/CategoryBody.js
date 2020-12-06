import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import {
  addCategory,
  getAllCategories,
} from "../../../redux/actions/category.action";

function CategoryBody() {
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const [show, setShow] = useState(false);

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const { categories } = category;
  // render
  // console.log(categories);
  const renderCate = (categories) => {
    if (!categories || categories.length === 0) return;
    return categories.map((cate) => {
      return (
        <li key={cate.name}>
          {cate.name}
          {cate.children && cate.children.length > 0 ? (
            <ul>{renderCate(cate.children)}</ul>
          ) : null}
          {/* {cate.children ? cate.children.length : null} */}
        </li>
      );
    });
  };

  const createCateList = (categories, options = []) => {
    if (!categories || categories.length === 0) return [];

    categories.map((cate) => {
      options.push({
        value: cate._id,
        name: cate.name,
      });
      cate.children &&
        cate.children.length &&
        createCateList(cate.children, options);
      return options;
    });
    return options;
  };

  const renderOptions = createCateList(categories).map((option) => (
    <option key={option.name} value={option.value}>
      {option.name}
    </option>
  ));

  // console.log(renderOptions);

  const handleShow = () => {
    // console.log("click add");
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleCategoryImage = (e) => {
    console.log(e.target.files[0]);
    setCategoryImage(e.target.files[0]);
  };

  const handleSubmitForm = () => {
    // const values = {
    //   categoryName,
    //   parentCategoryId,
    //   categoryImage,
    // };
    // console.log(values);

    const form = new FormData();

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    dispatch(addCategory(form));

    setShow(false);
  };

  console.log(categories);

  return (
    <>
      <Container fluid>
        <Row className="mt-3">
          <Col sm={12}>
            <div className="d-flex justify-content-between">
              <h3>Category</h3>
              <button className="btn btn-primary" onClick={handleShow}>
                Add
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <ul>{categories.length && renderCate(categories)}</ul>
        </Row>
      </Container>
      <>
        <Modal show={show} onHide={handleClose} style={{ top: "50px" }}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                  {renderOptions}
                </select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmitForm}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
}

export default CategoryBody;
