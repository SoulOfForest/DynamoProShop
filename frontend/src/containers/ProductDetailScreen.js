import React, { useMemo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Form, Card, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import moment from 'moment'

import { Rating } from "../components/Rating";
import { Loader } from '../components/Loader'
import { Meta } from '../components/Meta'

import { withLayout } from "../HOCs/withLayout";
import './Form.css'

import { fetchProductById, createProductReview } from '../redux/actions/product.actions'
import { addItemToCart } from '../redux/actions/cart.actions'

export const ProductDetailScreen = withLayout(({ match, history }) => {
  const dispatch = useDispatch();
  const { detail: matchedProduct, loading, error } = useSelector(state => state.productDetail);
  const { userInfo } = useSelector(state => state.userLogin);
  const { creating, error: creatingError } = useSelector(state => state.productReviewCreate);

  const { register, errors, handleSubmit } = useForm({
    criteriaMode: "all",
  });

  const [quantity, setQuantity] = useState(0);

  const { id } = match.params;

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch]);

  const handleFormSubmit = (data) => {
    dispatch(createProductReview(matchedProduct._id, data));
  }

  const handleQuantityChange = (e) => {
    if (parseInt(e.target.value) > matchedProduct.countInStock) {
      e.target.value = quantity;    
    } else if (parseInt(e.target.value) <= 0) {
      e.target.value = '0';    
      setQuantity(0);
    } else {
      setQuantity(e.target.value);
    }
  }

  const handleCartAddTo = () => {
    dispatch(addItemToCart(matchedProduct._id, quantity));
  }

  const renderMatchedProduct = (matchedProduct) => {
    if (matchedProduct) {
      return (
        <>
          <Meta title={matchedProduct.name}/>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <Row style={{ marginTop: '1.5rem' }}>
            <Col md={6}>
              <Image
                src={matchedProduct.image}
                alt={matchedProduct.name}
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{matchedProduct.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={matchedProduct.rating}
                    text={`${matchedProduct.numReviews} reviews`}
                    total={5}
                    color='#fce51c'
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: {matchedProduct.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {matchedProduct.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <strong>${matchedProduct.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        <strong>
                          {matchedProduct.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {
                    matchedProduct.countInStock > 0 && (
                      <ListGroup.Item>
                      <Row>
                        <Col>Quantity: </Col>
                        <Col>
                          <strong>
                            <Form.Control type="number" min='0' max={matchedProduct.countInStock} onKeyPress={(e) => e.preventDefault()} onChange={handleQuantityChange}/>
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    )
                  }
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={matchedProduct.countInStock === 0 || quantity === 0}
                      onClick={handleCartAddTo}
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2 style={{ marginTop: '1.5rem' }}>Reviews</h2>
              {matchedProduct.reviews.length === 0 && <Alert variant='info' style={{ marginTop: '1em' }}>
                        No reviews
                    </Alert>}
                    <ListGroup variant='flush'>
                      {
                        matchedProduct.reviews.map(review => (
                          <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating rating={review.rating}
                                total={5}
                                color='#fce51c'/>
                            <p>{moment(review.createdAt).format('MMMM Do YYYY')}</p>
                            <p>{review.comment}</p>
                          </ListGroup.Item>
                        ))
                      }
                      <ListGroup.Item>
                        <h2>Write a customer Review</h2>
                        { creating && <Loader /> }
                        { creatingError && <Alert variant='warning'>
                          {creatingError}
                        </Alert> }
                        {
                          userInfo ? <Form onSubmit={handleSubmit(handleFormSubmit)}>
                            <Form.Group controlId='rating'>
                              <Form.Label>Rating: </Form.Label>
                              <Form.Control as='select' name='rating' ref={register({
                                validate: value => {
                                  if (!value) return "Rating Must be selected!"
                                }
                              })}>
                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                              </Form.Control>
                              <ErrorMessage
                                errors={errors}
                                name="rating"
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
                            <Form.Group>
                              <Form.Label>Comment: </Form.Label>
                              <Form.Control as='textarea' row={3} name='comment' ref={register({
                                required: 'Comment is required'
                              })}></Form.Control>
                              <ErrorMessage
                                errors={errors}
                                name="comment"
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
                            <Button type='submit' variant='primary'>
                              Submit
                            </Button>
                          </Form> : <Alert variant='warning' style={{ marginTop: '1em' }}>
                              Please <Link to='/login'>sign in</Link> to write a review
                          </Alert>
                        }
                      </ListGroup.Item>
                    </ListGroup>
            </Col>
          </Row>

        </>
      );
    } 

    return null;
  };

  return (
    <>
        {renderMatchedProduct(matchedProduct)}
        {loading && <Loader />}
        {
          error && (
            <Alert variant='danger' style={{ marginTop: '1em' }}>
              This is a {error} alert—check it out!
            </Alert>
          )
        }
    </>
  )
});
