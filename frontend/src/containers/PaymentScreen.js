import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { FormContainer } from "../components/FormContainer";
import { CheckoutSteps } from '../components/CheckoutSteps'

import { savePaymentMethod } from '../redux/actions/cart.actions'

import { getShippingSteps } from '../helpers/getShippingSteps'

import { withLayout } from "../HOCs/withLayout";
import "./Form.css";

export const PaymentScreen = withLayout(({ history }) => {
  const { register, handleSubmit, errors } = useForm({
    criteriaMode: "all",
  });

  const dispatch = useDispatch();
  const { shippingAddress, cartItems } = useSelector(state => state.cart);

  if (Object.entries(shippingAddress).length === 0) {
    history.push('/shipping');
  } else if (cartItems.length === 0) {
    history.push('/cart');
  }

  const shippingSteps = getShippingSteps(['/order']);

  const handleFormSubmit = (data) => {
    const { paymentMethod } = data;
    dispatch(savePaymentMethod(paymentMethod));
  };

  return (
    <FormContainer>
    <CheckoutSteps steps={shippingSteps} />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit(handleFormSubmit)} style={{ marginTop: '1.5rem' }}>
        <Form.Group controlId="address">
          <Form.Label>Select Method: </Form.Label>
        </Form.Group>
        <Col>
            <Form.Check type='radio' label='PayPal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' ref={register()} defaultChecked>
            </Form.Check>
            <div className='payment-method__icon' style={{ marginTop: '.75em' }}>
              <i className="fab fa-cc-paypal fa-3x" style={{ marginRight: '.1em' }}></i>
              <i className="fab fa-cc-visa fa-3x"></i>
            </div>
            <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' ref={register()}></Form.Check>
            <div className='payment-method__icon' style={{ marginTop: '.75em' }}>
              <i className="fab fa-cc-stripe fa-3x"></i>
            </div>
        </Col>

        <Button type="submit" variant="primary" style={{ margin: '1.5em 0em' }}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
});
