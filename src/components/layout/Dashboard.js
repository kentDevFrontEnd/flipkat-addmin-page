import React from "react";
import { Col, Container, Row } from "reactstrap";

function Dashboard() {
  return (
    <Container fluid>
      <Row>
        <Col sm={2} className="sidebar">
          Side bar
        </Col>
        <Col sm={10} style={{ marginLeft: "auto" }}>
          Container
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
