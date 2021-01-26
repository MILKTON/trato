
import React, { useState } from 'react';
import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
      <Navbar color="light" light expand="md">
      <NavbarBrand>Trato</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="container-fluid">
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
          <NavItem  className="ml-auto">
            <NavLink
            exact
            activeClassName="navbar__link--active"
            className="nav-link"
            to="/login">Logout</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
    );
}
 
export default Navigation;
