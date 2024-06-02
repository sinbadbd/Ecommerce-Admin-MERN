import React, { useState } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../../actions';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import Link from '@mui/material/Link';


const Header = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout())
  }

  const renderLoggedInLinks = () => {
    return (
      // <ul>
      //   <li className="nav-item ">
      //     <span className="nav-link" onClick={logout}>Signout</span>
      //   </li>
      // </ul>
      <>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </>
    )
  }

  const renderNonLoggedInLink = () => {
    return (
      // <ul>
      //   <li className="nav-item">
      //     <NavLink to="signin" className="nav-link">Signin</NavLink>
      //   </li>
      //   <li className="nav-item">
      //     <NavLink to="signup" className="nav-link">Signup</NavLink>
      //   </li>
      // </ul>

      <>
        <MenuItem>
          <Link to="signin" href="#signin">
            Signin
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="signup" href="#signup">
            Signup
          </Link>
        </MenuItem>
      </>
    )
  }



  return (
    <header
      class="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none"
    >
      <div class="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11"
      >
        <div class="flex items-center gap-2 sm:gap-4">


          <div className='flex items-end'>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Menu
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >

              {
                auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLink()
              }

            </Menu>
          </div>

        </div>


      </div>

    </header>
  )
}

export default Header
