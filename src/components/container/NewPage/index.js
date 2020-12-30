import React, { useEffect, useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import createCategoriesList from "../../../helpers/createCategoriesList";
import { addNewPage } from "../../../redux/actions";
import SideBar from "../../layout/SideBar";
import CustomModal from "../../UI/CustomModal";

function NewPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [typeOfCategory, setTypeOfCategory] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const category = useSelector((state) => state.category);
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    setCategories(createCategoriesList(category.categories));
  }, [category]);

  useEffect(() => {
    if (page.loading) {
      setShowCreateModal(true);
    } else {
      setShowCreateModal(false);
    }
  }, [page]);

  console.log(page);

  const handleClose = () => {
    setShowCreateModal(false);
  };

  const handleCreate = () => {
    console.log(123);
    const form = new FormData();

    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", typeOfCategory);

    for (let banner of banners) {
      form.append("banners", banner);
    }
    for (let product of products) {
      form.append("products", product);
    }

    dispatch(addNewPage(form));

    setDesc("");
    setTitle("");
    setBanners([]);
    setProducts([]);
    setCategoryId("");
    setTypeOfCategory("");
  };

  const handleBannersImage = (e) => {
    // console.log(e.target.files);
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductsImage = (e) => {
    // console.log(e.target.files);
    setProducts([...products, e.target.files[0]]);
  };

  const renderCreateModal = () => {
    return (
      <CustomModal
        show={showCreateModal}
        handleClose={handleClose}
        handleSubmitForm={handleCreate}
        title="Create"
        btnText="Create"
        loading={page.loading}
      >
        <Form>
          <Row>
            <Col sm={8}>
              <Form.Group>
                <select
                  className="form-control"
                  name=""
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cate, index) => (
                    <option key={cate.value} value={cate.value}>
                      {cate.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group>
                <select
                  className="form-control"
                  name=""
                  value={typeOfCategory}
                  onChange={(e) => setTypeOfCategory(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="page">Page</option>
                  <option value="product">Product</option>
                </select>
              </Form.Group>
            </Col>
          </Row>
          {/* title */}
          <Row>
            <Col>
              <Form.Group>
                <input
                  className="form-control"
                  placeholder="Page title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* description */}
          <Row>
            <Col>
              <Form.Group>
                <input
                  className="form-control"
                  placeholder="Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* banners */}
          <Row>
            <Col>
              <Form.Group>
                {banners.length > 0 &&
                  banners.map((banner, index) => (
                    <div key={index} className="image__demo">
                      {banner.name}
                    </div>
                  ))}

                <input
                  type="file"
                  className="form-control"
                  onChange={handleBannersImage}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Products */}
          <Row>
            <Col>
              <Form.Group>
                {products.length > 0 &&
                  products.map((banner, index) => (
                    <div key={index} className="image__demo">
                      {banner.name}
                    </div>
                  ))}
                <input
                  type="file"
                  className="form-control"
                  onChange={handleProductsImage}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </CustomModal>
    );
  };
  return (
    <SideBar sidebar>
      <button
        className="btn btn-primary mt-3"
        onClick={() => setShowCreateModal(true)}
      >
        Create
      </button>
      {renderCreateModal()}
    </SideBar>
  );
}

export default NewPage;
