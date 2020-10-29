import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Loader } from "../components/Loader";
import { FormContainer } from "../components/FormContainer";
import { fetchProductById, updateProduct } from "../redux/actions/product.actions";

import { withLayout } from "../HOCs/withLayout";
import "./Form.css";

export const ProductEditScreen = withLayout(({ history, match }) => {
  const id = match.params.id;
  const { register, errors, handleSubmit, setValue } = useForm({
    criteriaMode: "all",
  });

  const dispatch = useDispatch();

  const { detail: product, loading } = useSelector((state) => state.productDetail);
  const { updating } = useSelector((state) => state.productUpdate);

  const handleFormSubmit = (data) => {
    const product= {
        ...data,
        _id: id
    };

    dispatch(updateProduct(product));
  };

  const handleFileUpload = async (e) => {  
    setValue("image", e.target.files[0].name);
  }

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light">
        Go Back
      </Link>
      <FormContainer>
        <h1 style={{ margin: "1em 0em" }}>Edit Product</h1>
        { updating && <Loader />}
        {loading ? <Loader /> : <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Form.Group controlId="name">
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              ref={register({
                required: "Name is required",
              })}
              defaultValue={product && product.name}
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
          <Form.Group controlId="price">
            <Form.Label>Price: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Price"
              name="price"
              ref={register({
                required: "Price is required",
              })}
              defaultValue={product && product.price}
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
          <Form.Group controlId="image">
            <Form.Label>Image: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              name="image"
              readOnly
              ref={register()}
              defaultValue={product && product.image}
            ></Form.Control>
            <Form.File id='image-file' name='image-file' label='Choose File' custom onChange={handleFileUpload} ref={register()}></Form.File>
            <ErrorMessage
              errors={errors}
              name="image"
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
          <Form.Group controlId="brand">
            <Form.Label>Brand: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              name="brand"
              ref={register({
                required: "Brand is required",
              })}
              defaultValue={product && product.brand}
            ></Form.Control>
            <ErrorMessage
              errors={errors}
              name="brand"
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
          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock: </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter countInStock"
              name="countInStock"
              ref={register({
                required: "CountInStock is required",
                min: {
                    value: 0,
                    message: 'Product in stock must greater than 0'
                }
              })}
              defaultValue={product && product.countInStock}
            ></Form.Control>
            <ErrorMessage
              errors={errors}
              name="countInStock"
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
          <Form.Group controlId="category">
            <Form.Label>Category: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category"
              name="category"
              ref={register({
                required: "Category is required",
              })}
              defaultValue={product && product.category}
            ></Form.Control>
            <ErrorMessage
              errors={errors}
              name="category"
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
          <Form.Group controlId="description">
            <Form.Label>Description: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              name="description"
              ref={register({
                required: "Description is required",
              })}
              defaultValue={product && product.description}
            ></Form.Control>
            <ErrorMessage
              errors={errors}
              name="description"
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
