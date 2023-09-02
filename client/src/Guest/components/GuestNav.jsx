import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function UserNav() {
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
            <Link className='btn btn-outline-dark me-md-3' to={'/login'}>Log In</Link>
            <Link className='btn btn-outline-dark' to={'/signup'}>Sign Up</Link>        
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNav;