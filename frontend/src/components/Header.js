import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchBox } from  './SearchBox'

import { logout } from '../redux/actions/user.actions'

export const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { cartItems } = useSelector(state => state.cart);

  const handleUserLogout = () => {
    dispatch(logout());
  }

  return (
    <header>
      <ToastContainer />
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Dynamo ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto">
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i style={{ marginRight: '5px' }} className="fas fa-shopping-cart"></i>
                  Cart
                  {cartItems.length > 0 && `(${cartItems.length})`}
                </Nav.Link>
              </LinkContainer> 
              {
                userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminMenu'>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )
              }
              {
                userInfo ?  (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleUserLogout}>Log Out</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                  <Nav.Link>
                    <i style={{ marginRight: '5px' }} className="fas fa-user"></i>
                    Sign in
                  </Nav.Link>
                </LinkContainer>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  );
};
