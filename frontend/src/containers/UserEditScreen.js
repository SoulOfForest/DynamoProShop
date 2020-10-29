import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Column, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Loader } from "../components/Loader";
import { FormContainer } from "../components/FormContainer";
import { getUserDetails, updateUser } from "../redux/actions/user.actions";

import { withLayout } from "../HOCs/withLayout";
import "./Form.css";

export const UserEditScreen = withLayout(({ history, match }) => {
  const id = match.params.id;
  const { register, errors, watch, handleSubmit } = useForm({
    criteriaMode: "all",
  });
  const watchPasswordConfirm = watch("password", "");

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.userDetails);
  const { updating } = useSelector((state) => state.userUpdate);

  const handleFormSubmit = (data) => {
    const { name, email, isAdmin } = data;
    console.log(isAdmin);
    dispatch(updateUser(isAdmin, name, email));
  };

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light">
        Go Back
      </Link>
      <FormContainer>
        <h1 style={{ margin: "1em 0em" }}>Edit User</h1>
        {updating && <Loader />}
        {loading ? <Loader /> : <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Form.Group controlId="name">
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              name="name"
              ref={register({
                required: "Name is required",
              })}
              defaultValue={user.name}
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
              defaultValue={user.email}
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
          <Form.Group controlId="isAdmin">
            <Form.Check
              type="checkbox"
              label='Is Admin'
              name="isAdmin"
              defaultChecked={user.isAdmin}
              ref={register()}
            ></Form.Check>

            <ErrorMessage
              errors={errors}
              name="isAdmin"
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
        </Form>}   
      </FormContainer>
    </>
  );
});
