import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Form, Button, Row, Column, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { LinkContainer } from "react-router-bootstrap";
import moment from 'moment'

import { Loader } from "../components/Loader";
import { FormContainer } from "../components/FormContainer";

import { userUpdateProfile } from "../redux/actions/user.actions";
import { getMyOrders } from "../redux/actions/order.actions";

import { withLayout } from "../HOCs/withLayout";
import "./Form.css";

const formatTwoDecimalPlaces = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
}

export const ProfileScreen = withLayout(({ history, location }) => {
  const { register, errors, watch, handleSubmit } = useForm({
    criteriaMode: "all",
  });
  const watchPasswordConfirm = watch("password", "");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { updating, error } = useSelector((state) => state.userUpdate);
  const { orders, loading, error: errorOrders } = useSelector(state => state.orderListMy);

  const handleFormSubmit = (data) => {
    const { name, email, password } = data;
    dispatch(userUpdateProfile(name, email, password));
  };

  useEffect(() => {
    dispatch(getMyOrders());
  }, []);

  return (
    <>
      <Row>
        <Col md={3}>
            <h2 style={{ margin: "1em 0em" }}>User Profile</h2>
            {error && (
              <Alert variant="danger" style={{ marginTop: "1em" }}>
                This is a {error} alert—check it out!
              </Alert>
            )}
            {updating && <Loader />}
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <Form.Group controlId="email">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Name"
                  name="name"
                  ref={register({
                    required: "Name is required",
                  })}
                  defaultValue={userInfo.name}
                ></Form.Control>
                <ErrorMessage
                  errors={errors}
                  name="name"
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
              <Form.Group controlId="email">
                <Form.Label>Email Address: </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  ref={register({
                    required: "Email is required",
                    minLength: {
                      value: 10,
                      message: "This input must exceed 10 characters",
                    },
                  })}
                  defaultValue={userInfo.email}
                ></Form.Control>
                <ErrorMessage
                  errors={errors}
                  name="email"
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
              <Form.Group controlId="password">
                <Form.Label>Password: </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  ref={register({
                  })}
                ></Form.Control>

                <ErrorMessage
                  errors={errors}
                  name="password"
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
              <Form.Group controlId="passwordConfirm">
                <Form.Label>Password Confirmation: </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password Confirmation"
                  name="passwordConfirm"
                  ref={register({
                    validate: (value) =>
                      value === watchPasswordConfirm ||
                      "Password Confirmation must be same as Password!",
                  })}
                ></Form.Control>

                <ErrorMessage
                  errors={errors}
                  name="passwordConfirm"
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
              <Button
                type="submit"
                variant="primary"
                style={{ margin: ".75em 0em" }}
              >
                Update
              </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2 style={{ margin: "1em 0em" }}>My Orders</h2>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                </tr>
              </thead>
              <tbody>
                {
                  orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{moment(order.createdAt).format('MMMM Do YYYY')}</td>
                      <td>${formatTwoDecimalPlaces(order.totalPrice)}</td>
                      <td>
                        {order.isPaid ? moment(order.paidAt).format('MMMM Do YYYY') : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? moment(order.deliveredAt).format('MMMM Do YYYY') : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`order/${order._id}`}>
                          <Button variant='light' className='btn-sm'>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            {loading && <Loader />}
            {errorOrders && <Alert variant="danger" style={{ marginTop: "1em" }}>
                This is a {error} alert—check it out!
              </Alert>}
        </Col>
      </Row>
    </>
  );
});
