
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
      <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Trato</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink
            exact
            activeClassName="navbar__link--active"
            className="nav-link"
            to="/"
            >
            Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
            exact
            activeClassName="navbar__link--active"
            className="nav-link"
            to="/transfer">
              Transfer
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
            exact
            activeClassName="navbar__link--active"
            className="nav-link"
            to="/login">Login</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
    );
}
 
export default Navigation;
