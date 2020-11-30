import React from 'react'
import {Navbar,Nav, Form} from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
const Header = (props) => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Link to="/" className="navbar-brand">Admin Dashboard</Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                {/* <Nav className="justify-content-end mr-auto">
                    <Nav.Link href="#features">Signin</Nav.Link>
                    <Nav.Link href="#pricing">Signup</Nav.Link>
                </Nav> */}
              </Navbar.Collapse>
              <Nav>
                <li className="nav-item">
                    <NavLink to="signin" className="nav-link">Signin</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="signup" className="nav-link">Signup</NavLink>
                </li>
              </Nav>
            </Navbar>
        </div>
    )
}

export default Header
