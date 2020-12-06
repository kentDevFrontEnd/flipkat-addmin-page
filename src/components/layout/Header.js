import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Button, Collapse, Container, NavItem } from "reactstrap";
import { signOut } from "../../redux/actions";

function NavBar(props) {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    window.localStorage.clear();
  };

  const renderLogined = () => {
    return (
      <ul className="navbar-nav ml-auto">
        <NavItem>
          <span
            style={{ cursor: "pointer" }}
            className="nav-link"
            onClick={handleSignOut}
          >
            Sign Out
          </span>
        </NavItem>
      </ul>
    );
  };

  const renderNonLogined = () => {
    return (
      <ul className="navbar-nav ml-auto">
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
    );
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ zIndex: 10000 }}
      >
        <Container>
          <Link to="/" className="navbar-brand text-capitalize">
            Dashboard
          </Link>
          <Button onClick={toggle} className="navbar-toggler">
            <span className="navbar-toggler-icon"></span>
          </Button>
          <Collapse isOpen={isOpen} className="navbar-collapse">
            {auth.authenticate ? renderLogined() : renderNonLogined()}
          </Collapse>
        </Container>
      </nav>
    </>
  );
}

export default NavBar;
