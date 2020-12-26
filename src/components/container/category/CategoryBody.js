import React, { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import {
  MdAddBox,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdChevronRight,
  MdFolder,
  MdFolderOpen,
  MdIndeterminateCheckBox,
  MdInsertDriveFile,
  MdKeyboardArrowDown,
  MdAddToPhotos,
  MdEdit,
  MdClear,
} from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../../../redux/actions/category.action";

import AddCategoryModal from "./components/AddCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";
import UpdateCategoryModal from "./components/UpdateCategoryModal";

import "./style.css";

function CategoryBody() {
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

  // submit add

  const handleSubmitAdd = (data) => {
    dispatch(addCategory(data));

    setShow(false);
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
    const ids = [...checked];
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

  return (
    <>
      <Container fluid>
        <Row className="mt-3">
          <Col sm={12}>
            <div className="d-flex justify-content-between">
              <h3>Category</h3>
              <div>
                <Button color="primary" onClick={handleShow}>
                  <MdAddToPhotos /> Add
                </Button>
                <Button
                  color="warning"
                  className="mx-3"
                  onClick={handleShowEdit}
                >
                  <MdEdit /> Edit
                </Button>
                <Button color="danger" onClick={handleShowDel}>
                  <MdClear /> Delete
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="checkbox-tree">
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
      </Container>

      {/* {renderAddCategoryModal()} */}
      <AddCategoryModal
        show={show}
        renderOptions={renderOptions}
        handleSubmitAdd={handleSubmitAdd}
        handleCloseAddModal={handleCloseAddModal}
      />
      {/* {renderEditCategoryModal()} */}
      <UpdateCategoryModal
        showEdit={showEdit}
        checkedArr={checkedArr}
        expandedArr={expandedArr}
        renderOptions={renderOptions}
        handleChange={handleChange}
        handleEditCategory={handleEditCategory}
        handleCloseEditModal={handleCloseEditModal}
      />
      {/* {renderDeleteConfirmModal()} */}
      <DeleteCategoryModal
        showDel={showDel}
        checkedArr={checkedArr}
        expandedArr={expandedArr}
        handleCloseDel={handleCloseDel}
        handleDeleteCategory={handleDeleteCategory}
      />
    </>
  );
}

export default CategoryBody;
