import React from 'react'
import { Navbar, Nav, Form } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { signout } from '../../actions';

const Header = (props) => {


  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout())
  }

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>Signout</span>
        </li> 
      </Nav>
    )
  }

  const renderNonLoggedInLink = () => {
    return(
      <Nav>
        <li className="nav-item">
          <NavLink to="signin" className="nav-link">Signin</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="signup" className="nav-link">Signup</NavLink>
        </li>
      </Nav>
    )
  }



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

            {
              auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLink()
            }    

      </Navbar>
    </div>
  )
}

export default Header
