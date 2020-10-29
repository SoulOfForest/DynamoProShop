import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Loader } from "../components/Loader";
import { FormContainer } from "../components/FormContainer";
import { login } from "../redux/actions/user.actions";

import { withLayout } from "../HOCs/withLayout";
import "./Form.css";

export const LoginScreen = withLayout(({ history }) => {
  const { register, errors, handleSubmit } = useForm({      
    criteriaMode: "all"
  });

  const dispatch = useDispatch();
  const { userInfo, error, loading } = useSelector((state) => state.userLogin);

  const handleFormSubmit = (data) => {
    const referrer = history.location.state || { from: { pathname: '/' }};
    const { email, password } = data;
    dispatch(login(email, password, referrer));
  };

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
                name="multipleErrorInput"
                render={({ messages }) => {
                console.log("messages", messages);
                return messages
                    ? Object.entries(messages).map(([type, message]) => (
                        <p className="error-message" style={{ marginTop: "1em" }} key={type}>
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
                    console.log(messages);
                return messages ? Object.entries(messages).map(([type, message]) => (
                    <p className="error-message" style={{ marginTop: "1em" }} key={type}>
                        ⚠  {message}
                    </p> 
                )) : null
                
              }}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            style={{ margin: ".75em 0em" }}
          >
            Sign In
          </Button>
        </Form>
        <Row style={{ marginTop: ".5em" }}>
          <Col>
            <strong>
              New customer ? <Link to={`/register`}>Register</Link>
            </strong>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
});
