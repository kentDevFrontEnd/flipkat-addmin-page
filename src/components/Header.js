import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Collapse, Container, NavItem } from "reactstrap";

function NavBar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Container>
          <Link to="/" className="navbar-brand text-capitalize">
            Dashboard
          </Link>
          <Button onClick={toggle} className="navbar-toggler">
            <span className="navbar-toggler-icon"></span>
          </Button>
          <Collapse isOpen={isOpen} className="navbar-collapse">
            <ul className="navbar-nav w-100">
              <NavItem>
                <NavLink to="/signin" className="nav-link">
                  Sign In
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink to="/signup" className="nav-link">
                  Sign Up
                </NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Container>
      </nav>
    </>
  );
}

export default NavBar;
