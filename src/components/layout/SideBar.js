import React from "react";
import { ListGroup } from "react-bootstrap";
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
              <ListGroup as="ul">
                <ListGroup.Item>
                  <NavLink to="/">Home</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/new-page">New Page</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/category">Category</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/products">Products</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/orders">Orders</NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={10} style={{ marginLeft: "auto", paddingTop: "56px" }}>
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
