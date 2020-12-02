import React from "react";
import { NavLink } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Header from "./Header";

function SideBar(props) {
  return (
    <>
      <Header />
      <Container fluid>
        {props.sidebar ? (
          <Row>
            <Col sm={2} className="sidebar">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/category">Category</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/orders">Orders</NavLink>
                </li>
              </ul>
            </Col>
            <Col sm={10} style={{ marginLeft: "auto" }}>
              {props.children}
            </Col>
          </Row>
        ) : (
          props.children
        )}
      </Container>
    </>
  );
}

export default SideBar;
