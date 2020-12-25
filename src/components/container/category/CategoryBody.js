import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
import {
  addCategory,
  updateCategory,
  getAllCategories,
  deleteCategory,
} from "../../../redux/actions/category.action";
import CustomModal from "../../UI/CustomModal";
import CheckboxTree from "react-checkbox-tree";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdChevronRight,
  MdKeyboardArrowDown,
  MdAddBox,
  MdIndeterminateCheckBox,
  MdFolder,
  MdFolderOpen,
  MdInsertDriveFile,
} from "react-icons/md";

function CategoryBody() {
  // for add item
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  // for react checkbox tree
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  // show add modal
  const [show, setShow] = useState(false);

  // for edit item array
  const [checkedArr, setCheckedArr] = useState([]);
  const [expandedArr, setExpandedArr] = useState([]);

  // show edit modal
  const [showEdit, setShowEdit] = useState(false);

  // show delete confirm modal
  const [showDel, setShowDel] = useState(false);

  // get category from redux
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const { categories } = category;

  // create list with name
  const renderCate = (categories) => {
    if (!categories || categories.length === 0) return [];
    return categories.map((cate) => {
      return (
        <li key={cate.name}>
          {cate.name}
          {cate.children && cate.children.length > 0 ? (
            <ul>{renderCate(cate.children)}</ul>
          ) : (
            []
          )}
          {/* {cate.children ? cate.children.length : null} */}
        </li>
      );
    });
  };

  // create array with key: value and name
  const createCateList = (categories, options = []) => {
    if (!categories || categories.length === 0) return [];

    categories.map((cate) => {
      options.push({
        value: cate._id,
        name: cate.name,
        parentId: cate.parentId,
      });
      cate.children &&
        cate.children.length &&
        createCateList(cate.children, options);
      return options;
    });
    return options;
  };

  // render for option tag of select
  const renderOptions = createCateList(categories).map((option) => (
    <option key={option.name} value={option.value}>
      {option.name}
    </option>
  ));

  // create nodes for react checkbox tree
  const nodes = (categories) => {
    if (!categories || categories.length === 0) return [];

    let result = [];

    for (let cate of categories) {
      result.push({
        value: cate._id,
        label: cate.name,
        children: cate.children && cate.children.length && nodes(cate.children),
      });
    }
    return result;
  };

  // icons for react checkbox tree
  const icons = {
    check: <MdCheckBox />,
    uncheck: <MdCheckBoxOutlineBlank />,
    halfCheck: <MdIndeterminateCheckBox />,
    expandClose: <MdChevronRight />,
    expandOpen: <MdKeyboardArrowDown />,
    expandAll: <MdAddBox />,
    collapseAll: <MdIndeterminateCheckBox />,
    parentClose: <MdFolder />,
    parentOpen: <MdFolderOpen />,
    leaf: <MdInsertDriveFile />,
  };

  // open modal add category
  const handleShow = () => {
    setShow(true);
  };

  // close add modal
  const handleCloseAddModal = () => {
    setShow(false);
  };

  const checkedAndExpandedArr = () => {
    const categoryList = createCateList(categories);
    console.log(categoryList);

    const tempCheckedArr =
      checked &&
      checked.map((id) => {
        console.log(id);
        return categoryList.find((item) => item.value === id);
      });
    const tempExpandedArr =
      expanded &&
      expanded.map((id) => {
        return categoryList.find((item) => item.value === id);
      });

    setCheckedArr(tempCheckedArr);
    setExpandedArr(tempExpandedArr);
  };

  // open edit modal
  const handleShowEdit = () => {
    checkedAndExpandedArr();
    setShowEdit(true);
  };

  // close edit modal
  const handleCloseEditModal = () => {
    setShowEdit(false);
  };

  // open delete confirm modal
  const handleShowDel = () => {
    checkedAndExpandedArr();
    setShowDel(true);
  };

  // close delete confirm modal
  const handleCloseDel = () => {
    setShowDel(false);
  };

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

    dispatch(addCategory(form));

    setShow(false);
    setCategoryName("");
    setParentCategoryId("");
    setCategoryImage("");
  };

  // submit edit
  const handleEditCategory = () => {
    console.log("edit");

    const form = new FormData();

    expandedArr.length > 0 &&
      expandedArr.forEach((item) => {
        form.append("_id", item.value);
        form.append("name", item.name);
        form.append("parentId", item.parentId ? item.parentId : "");
        form.append("type", item.type ? item.type : "store");
      });

    checkedArr.length > 0 &&
      checkedArr.forEach((item) => {
        form.append("_id", item.value);
        form.append("name", item.name);
        form.append("parentId", item.parentId ? item.parentId : "");
        form.append("type", item.type ? item.type : "store");
      });

    dispatch(updateCategory(form)).then((res) => {
      console.log("after dispatch");
      if (res) dispatch(getAllCategories());
    });

    setShowEdit(false);
  };

  // submit delete

  const handleDeleteCategory = () => {
    console.log(123);
    const ids = [...expanded, ...checked];
    // console.log(data);

    dispatch(deleteCategory(ids)).then((res) => {
      if (res) dispatch(getAllCategories());
    });

    setChecked([]);
    setExpanded([]);
    setCheckedArr([]);
    setExpandedArr([]);

    setShowDel(false);
  };

  const handleChange = (key, value, index, type) => {
    if (type === "expanded") {
      const updateExpandedArr = expandedArr.map((item, _index) =>
        _index === index ? { ...item, [key]: value } : item
      );
      setExpandedArr(updateExpandedArr);
    } else if (type === "checked") {
      const updateCheckedArr = checkedArr.map((item, _index) =>
        _index === index ? { ...item, [key]: value } : item
      );
      setCheckedArr(updateCheckedArr);
    }
  };

  console.log("expandedArr", expandedArr);
  console.log("expanded", expanded);
  console.log("checkedArr", checkedArr);
  console.log("checked", checked);

  const renderAddCategoryModal = () => {
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
  };

  // edit modal
  const renderEditCategoryModal = () => {
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
                        handleChange(
                          "parentId",
                          e.target.value,
                          index,
                          "checked"
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
  };

  const renderDeleteConfirmModal = () => {
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
        {expandedArr.length > 0 &&
          expandedArr.map((item, index) => (
            <Row key={item.value}>
              <Col>{item.name}</Col>
            </Row>
          ))}
        {checkedArr.length > 0 &&
          checkedArr.map((item, index) => (
            <Row key={item.value}>
              <Col>{item.name}</Col>
            </Row>
          ))}
      </CustomModal>
    );
  };

  return (
    <>
      <Container fluid>
        <Row className="mt-3">
          <Col sm={12}>
            <div className="d-flex justify-content-between">
              <h3>Category</h3>
              <button className="btn btn-primary" onClick={handleShow}>
                Add Category
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          {/* <ul>{categories.length && renderCate(categories)}</ul> */}
          <CheckboxTree
            nodes={nodes(categories)}
            checked={checked}
            expanded={expanded}
            onCheck={(checked) => setChecked(checked)}
            onExpand={(expanded) => setExpanded(expanded)}
            icons={icons}
          />
        </Row>
        <Row>
          <Col className="mt-3">
            <Button color="warning" className="mr-3" onClick={handleShowEdit}>
              Edit Category
            </Button>
            <Button color="danger" onClick={handleShowDel}>
              Delete Category
            </Button>
          </Col>
        </Row>
      </Container>

      {renderAddCategoryModal()}
      {renderEditCategoryModal()}
      {renderDeleteConfirmModal()}
    </>
  );
}

export default CategoryBody;
