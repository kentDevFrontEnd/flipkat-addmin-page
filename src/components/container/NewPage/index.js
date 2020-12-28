import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import createCategoriesList from "../../../helpers/createCategoriesList";
import SideBar from "../../layout/SideBar";
import CustomModal from "../../UI/CustomModal";

function NewPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const category = useSelector((state) => state.category);

  useEffect(() => {
    setCategories(createCategoriesList(category.categories));
  }, [category]);

  console.log(categories);

  const handleClose = () => {
    setShowCreateModal(false);
  };

  const handleCreate = () => {
    console.log(123);
  };

  const handleBannersImage = (e) => {
    console.log(e.target.files);
  };

  const handleProductsImage = (e) => {
    console.log(e.target.files);
  };

  const renderCreateModal = () => {
    return (
      <CustomModal
        show={showCreateModal}
        handleClose={handleClose}
        handleSubmitForm={handleCreate}
        title="Create"
        btnText="Create"
      >
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <select
                  className="form-control"
                  name=""
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cate, index) => (
                    <option key={cate.id} value="cate._id">
                      {cate.name}
                    </option>
                  ))}
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
