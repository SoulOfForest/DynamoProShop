import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Image, Card, ListGroup, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { CheckoutSteps } from '../components/CheckoutSteps'
import { Loader } from '../components/Loader'

import { createOrder } from '../redux/actions/order.actions'

import { getShippingSteps } from '../helpers/getShippingSteps'

import { withLayout } from "../HOCs/withLayout";

const formatTwoDecimalPlaces = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const PlaceOrderScreen = withLayout(() => {
    const dispatch = useDispatch();
    const { cartItems, shippingAddress, paymentMethod } = useSelector(state => state.cart);
    const { ordering, error } = useSelector(state => state.orderCreate);

    const { address, city, postalCode, country } = shippingAddress;

    const shippingSteps = getShippingSteps([]);

    const itemsPrice = cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity; 
    }, 0);

    const shippingPrice = itemsPrice > 100 ? 0: 100;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const handleCartItemsOrder = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            itemsPrice,
            taxPrice,
            totalPrice,
            shippingAddress,
            shippingPrice,
            paymentMethod
        }));
    }

    return (
        <>
            <CheckoutSteps steps={shippingSteps}/>
            <Row style={{ marginTop: '1.5rem' }}>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2 style={{ marginBottom: '.9m' }}>Shipping</h2>
                            <p>
                                <strong style={{ fontSize: '.95rem', fontWeight: '800 '}}>Address: </strong>
                                {address}, {city}, {postalCode}, {country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2 style={{ marginBottom: '.9em' }}>Payment Method</h2>
                            <strong style={{ fontSize: '.95rem', fontWeight: '800 '}}>Method: </strong>
                            {paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2 style={{ marginBottom: '.9em' }}>Order Items</h2>
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
                                                        <Col md={1}>
                                                            <Image src={cartItem.image} alt={cartItem.name} fluid rounded />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${cartItem.id}`}>{cartItem.name}</Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {cartItem.quantity} x ${cartItem.price} = ${cartItem.price * cartItem.quantity}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${formatTwoDecimalPlaces(itemsPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${formatTwoDecimalPlaces(shippingPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax Price:</Col>
                                    <Col>${formatTwoDecimalPlaces(taxPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${formatTwoDecimalPlaces(totalPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                                {error && (
                                    <ListGroup.Item>
                                        <Alert variant="danger" style={{ marginTop: "1em" }}>
                                            This is a {error} alert—check it out!
                                        </Alert>
                                    </ListGroup.Item>
                                )}
                                {
                                    ordering && <Loader />
                                }          
                            <ListGroup.Item>
                                <Row>
                                    <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={handleCartItemsOrder}>Place Order</Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
});
