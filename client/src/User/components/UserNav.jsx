import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { GlobalContext } from '../../Context/context';
import { LuPackageSearch } from 'react-icons/lu'

function UserNav() {
  const {state, dispatch} = useContext(GlobalContext)

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to={'/home'} className='text-decoration-none text-dark navbar-brand'>TechTonic</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className='nav-link' to={'/'}>Home</Link>
            <Link className='nav-link' to={'/products'}>Products</Link>
            <Link className='nav-link' to={'/categories'}>Categories</Link>
          </Nav>
          <Nav>
            <Link className='nav-link me-2' to={'/track-order'}><LuPackageSearch className='fs-3' /></Link>
            <Link className='nav-link me-4' to={'/cart'}><HiOutlineShoppingCart className='fs-3' /></Link>
            <button className='btn btn-outline-dark' 
              onClick={() => {
                dispatch({
                  type: "USER_LOGOUT"
                })
              }}
            >
                Sign Out
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNav;