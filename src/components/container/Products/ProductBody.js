import React from "react";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/actions/product.action";
import CustomModal from "../../UI/CustomModal";
import "./style.css";

function ProductBody() {
  const [show, setShow] = useState(false);

  const [prodName, setProdName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [prodImage, setProdImage] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [showProdDetail, setShowProdDetail] = useState(false);
  const [prodDetails, setProdDetails] = useState(null);

  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const { categories } = category;
  const { products } = product;
  console.log(products);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleCloseProdDetail = () => {
    setShowProdDetail(false);
  };

  const handleShowProdDetail = (prod) => {
    setShowProdDetail(true);
    console.log(prod);
    setProdDetails(prod);
  };

  const handleProductImages = (e) => {
    setProdImage([...prodImage, e.target.files[0]]);
  };

  const handleAddProduct = () => {
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

    setProdName("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setProdImage([]);
    setCategoryId("");
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

  // console.log(prodImage);

  //TODO FIXME show product when add success

  const renderProducts = () => {
    return (
      <Table responsive striped hover bordered className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Category</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.length > 0 &&
            products.map((prod, index) => (
              <tr key={prod._id}>
                <td>{index}</td>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>{prod.quantity}</td>
                <td>{prod.description}</td>
                <td>{prod.category.name}</td>
                <td>
                  <Button
                    variant="info"
                    className="mr-3"
                    onClick={() => handleShowProdDetail(prod)}
                  >
                    Details
                  </Button>
                  <Button variant="info" className="mr-3">
                    Edit
                  </Button>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <CustomModal
        show={show}
        handleClose={handleClose}
        handleSubmitForm={handleAddProduct}
        title="Add Product"
        btnText="Save Product"
        add
      >
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
              <option value="">Select</option>
              {renderOptions}
            </select>
          </Form.Group>
        </Form>
      </CustomModal>
    );
  };

  const renderDetailProductModal = () => {
    if (!prodDetails) return null;
    return (
      <CustomModal
        size="lg"
        show={showProdDetail}
        handleSubmitForm={handleCloseProdDetail}
        title="Product Detail"
        btnText="Back"
      >
        <Row>
          <Col md={6}>
            <h6>Name</h6>
            <p className="text-small">{prodDetails.name}</p>
          </Col>
          <Col md={6}>
            <h6>Price</h6>
            <p className="text-small">{prodDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h6>Category</h6>
            <p className="text-small">{prodDetails.category.name}</p>
          </Col>
          <Col md={6}>
            <h6>Quantity</h6>
            <p className="text-small">{prodDetails.quantity}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h6>Description</h6>
            <p className="text-small">{prodDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="prod__detail">
            <h6>Pictures</h6>

            {prodDetails.picture.length &&
              prodDetails.picture.map((pic) => (
                <div key={pic._id} className="prod__detail-img">
                  <img src={`http://localhost:8080/public/${pic.img}`} alt="" />
                </div>
              ))}
          </Col>
        </Row>
      </CustomModal>
    );
  };

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

        <Row>{renderProducts()}</Row>
      </Container>

      {renderAddProductModal()}

      {renderDetailProductModal()}
    </>
  );
}

export default ProductBody;
