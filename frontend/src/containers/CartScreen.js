import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Alert, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { withLayout } from '../HOCs/withLayout'

import { addItemToCart, removeItemFromCart } from '../redux/actions/cart.actions'

export const CartScreen = withLayout(({ match, history }) => {
    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cart);

    const handleQuantityChange = (e, cartItem) => {
        dispatch(addItemToCart(cartItem._id, parseInt(e.target.value)));
    }

    const handleCartItemRemove = (e, cartItem) => {
        dispatch(removeItemFromCart(cartItem._id));
    }

    const handleTotalItemCount = (cartItems) => {
        return cartItems.reduce((acc, cartItem) => {
            return acc + parseInt(cartItem.quantity);
        }, 0);
    }

    const handleCartItemsTotalPrice = (cartItems) => {
        return cartItems.reduce((acc, cartItem) => {
            return acc + parseInt(cartItem.quantity) * parseInt(cartItem.price);
        }, 0);
    } 

    const handleCartCheckout = () => {
        history.push('/shipping');
    }

    return (
        <>
        <h1 style={{ padding: '.2em 0em', fontSize: '2rem' }}>Shopping Cart</h1>
        <Row style={{ marginTop: '1.5rem' }}>
            <Col md={8}>
                <Link className="btn btn-light" style={{marginBottom: '1rem'}} to="/">
                    Go Back
                </Link>
                {
                    cartItems.length === 0 ? (
                        <Alert variant='warning' style={{ margin: '.75em 0em' }}>
                            Your cart is empty ! <Link to='/'>Go Back</Link>
                        </Alert>
                    ) : (
                        <ListGroup variant='flush'>
                            {
                                cartItems.map(cartItem => (
                                    <ListGroup.Item key={cartItem._id}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={cartItem.image} fluid rounded/>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${cartItem._id }`} style={{ fontWeight: 'bold', fontSize: '.9rem' }}>{cartItem.name}</Link>
                                            </Col>
                                            <Col md={2}>
                                                ${cartItem.price}
                                            </Col>
                                            <Col md={2}>                                               
                                                <Form.Control type="number" min='1' max={cartItem.countInStock} value={cartItem.quantity} onKeyPress={(e) => e.preventDefault()} onChange={(e) => handleQuantityChange(e, cartItem)}/>                              
                                            </Col>
                                            <Col md={2}>
                                                <Button type='button' variant='light' onClick={(e) => handleCartItemRemove(e, cartItem)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2 style={{ padding: '.2em 0', fontSize: '1.4rem' }}>Sub total ({handleTotalItemCount(cartItems)}) items</h2>
                            ${handleCartItemsTotalPrice(cartItems)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={handleCartCheckout}>
                                Proceed To Check Out
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
});
