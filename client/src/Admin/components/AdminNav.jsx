import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../Context/context';
import { useContext } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';

function AdminNav() {
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
            <NavDropdown title="Orders" id="basic-nav-dropdown">
                <Link className='dropdown-item' to={`/orders/pending`}>Pending</Link>
                <Link className='dropdown-item' to={`/orders/approved`}>Approved</Link>
                <Link className='dropdown-item' to={`/orders/delivered`}>Delivered</Link>
                <Link className='dropdown-item' to={`/orders/canceled`}>Canceled</Link>

            </NavDropdown>
          </Nav>
          <Nav>
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

export default AdminNav;