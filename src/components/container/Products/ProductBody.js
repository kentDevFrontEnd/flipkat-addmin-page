import React from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/actions/product.action";

function ProductBody() {
  const [show, setShow] = useState(false);

  const [prodName, setProdName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [prodImage, setProdImage] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const { categories } = category;

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleProductImages = (e) => {
    setProdImage([...prodImage, e.target.files[0]]);
  };

  const handleSubmitForm = () => {
    const form = new FormData();
    form.append("name", prodName);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("category", categoryId);
    form.append("description", description);

    for (let pic of prodImage) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));
    setShow(false);
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

  console.log(prodImage);

  return (
    <>
      <Container fluid>
        <Row className="mt-3">
          <Col sm={12}>
            <div className="d-flex justify-content-between">
              <h3>Products</h3>
              <button className="btn btn-primary" onClick={handleShow}>
                Add Product
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} style={{ top: "50px" }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <input
                className="form-control"
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                type="text"
                placeholder="Name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <input
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                placeholder="000"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <input
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                placeholder="100"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <input
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="description"
              />
            </Form.Group>

            <div>{prodImage && prodImage.map((img) => <p>{img.name}</p>)}</div>

            <Form.Group>
              <input
                type="file"
                name="categoryImage"
                onChange={handleProductImages}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Category</Form.Label>
              <select
                className="form-control"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
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
  );
}

export default ProductBody;
