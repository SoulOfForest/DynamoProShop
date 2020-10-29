import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Column, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Loader } from "../components/Loader";
import { FormContainer } from "../components/FormContainer";
import { registerAction } from '../redux/actions/user.actions'

import { withLayout } from "../HOCs/withLayout";
import "./Form.css";

export const RegisterScreen = withLayout(({ history, location }) => {
  const { register, errors, watch, handleSubmit } = useForm({
    criteriaMode: "all",
  });
  const watchPasswordConfirm = watch('password', '');

  const dispatch = useDispatch();
  const { registering: loading, error } = useSelector(state => state.userRegister);
  const { userInfo } = useSelector(state => state.userLogin);

  const handleFormSubmit = (data) => {
    const { name, email, password } = data;   
    dispatch(registerAction(name, email, password));
  };
  
  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }  
  }, []);

  return (
    <>
      <FormContainer>
        <h1 style={{ margin: "1em 0em" }}>Sign In</h1>
        {error && (
          <Alert variant="danger" style={{ marginTop: "1em" }}>
            This is a {error} alert—check it out!
          </Alert>
        )}
        {loading && <Loader />}
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Form.Group controlId="email">
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              name="name"
              ref={register({
                required: "Name is required"
              })}
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
                required: "Password is required",
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
                required: "Password Confirmation is required",
                validate: value => value === watchPasswordConfirm || "Password Confirmation must be same as Password!"     
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
            Register
          </Button>
        </Form>
        <Row style={{ marginTop: ".5em" }}>
          <Col>
            <strong>
              Have an account ? <Link to={`/login`}>Sign in</Link>
            </strong>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
});
