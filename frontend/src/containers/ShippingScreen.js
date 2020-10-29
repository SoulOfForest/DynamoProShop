import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { FormContainer } from "../components/FormContainer";
import { CheckoutSteps } from '../components/CheckoutSteps'

import { saveShippingAddress } from '../redux/actions/cart.actions'

import { getShippingSteps } from '../helpers/getShippingSteps'

import { withLayout } from "../HOCs/withLayout";
import "./Form.css";

export const ShippingScreen = withLayout(({ history }) => {
  const { register, handleSubmit, errors } = useForm({
    criteriaMode: "all",
  });

  const dispatch = useDispatch();
  const { shippingAddress, cartItems } = useSelector(state => state.cart);

  if (cartItems.length === 0) {
      history.push('/cart');
  }

  const shippingSteps = getShippingSteps(['/payment', '/order']);

  const handleFormSubmit = (data) => {
    dispatch(saveShippingAddress(data));
  };

  return (
    <FormContainer>
    <CheckoutSteps steps={shippingSteps} />
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit(handleFormSubmit)} style={{ marginTop: '1.5rem' }}>
        <Form.Group controlId="address">
          <Form.Label>Name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            name="address"
            ref={register({
              required: "Address is required",
            })}
            defaultValue={shippingAddress.address}
          ></Form.Control>
          <ErrorMessage
            errors={errors}
            name="address"
            render={({ messages }) => {
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                    <p
                      className="error-message"
                      style={{ marginTop: "1em" }}
                      key={type}
                    >
                      <strong>⚠ {message}</strong>
                    </p>
                  ))
                : null;
            }}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>Email City: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            name="city"
            ref={register({
              required: "City is required",
            })}
            defaultValue={shippingAddress.city}
          ></Form.Control>
          <ErrorMessage
            errors={errors}
            name="city"
            render={({ messages }) => {
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                    <p
                      className="error-message"
                      style={{ marginTop: "1em" }}
                      key={type}
                    >
                      <strong>⚠ {message}</strong>
                    </p>
                  ))
                : null;
            }}
          />
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            name="postalCode"
            ref={register({
              required: "Postal Code is required",
            })}
            defaultValue={shippingAddress.postalCode}
          ></Form.Control>

          <ErrorMessage
            errors={errors}
            name="postalCode"
            render={({ messages }) => {
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                    <p
                      className="error-message"
                      style={{ marginTop: "1em" }}
                      key={type}
                    >
                      ⚠ {message}
                    </p>
                  ))
                : null;
            }}
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Enter Country: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            name="country"
            ref={register({
              required: "Country is required",
            })}
            defaultValue={shippingAddress.country}
          ></Form.Control>

          <ErrorMessage
            errors={errors}
            name="country"
            render={({ messages }) => {
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                    <p
                      className="error-message"
                      style={{ marginTop: "1em" }}
                      key={type}
                    >
                      ⚠ {message}
                    </p>
                  ))
                : null;
            }}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
});
