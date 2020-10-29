import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import {
  getOrderDetails,
  payOrder,
  deleteOrder,
  deliverOrder,
} from "../redux/actions/order.actions";

import axios from "../axios";

import { withLayout } from "../HOCs/withLayout";

const formatTwoDecimalPlaces = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const OrderScreen = withLayout(({ match }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { delivering } = useSelector(
    (state) => state.orderDeliver
  );
  const { paying } = useSelector((state) => state.orderPay);
  const { deleting } = useSelector((state) => state.orderDelete);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    const getPaypalClientId = async () => {
      console.log("get");
      if (!clientId) {
        try {
          axios.defaults.withCredentials = true;
          const { data: clientId } = await axios.get("/api/config/paypal");
          console.log(clientId);
          setClientId(clientId);
        } catch (err) {
          console.error(err.message);
        }
      }
    };

    getPaypalClientId();
  }, [clientId, setClientId]);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [orderId, dispatch]);

  const handlePaymentSuccess = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const handleOrderDelivered = () => {
    dispatch(deliverOrder(orderId));
  };

  const renderError = (error) => {
    if (error) {
      return (
        <Alert variant="danger" style={{ marginTop: "1em" }}>
          {error}
        </Alert>
      );
    }
  };

  const handleOrderDelete = () => {
    confirmAlert({
      title: "Confirm to Delete Order",
      message: "Are you sure to do delete order ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteOrder(orderId)),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const renderOrderDetails = (order) => {
    if (order) {
      const {
        shippingAddress,
        totalPrice,
        shippingPrice,
        taxPrice,
        paymentMethod,
        orderItems,
        user,
        isPaid,
        paidAt,
        deliveredAt,
        isDelivered,
      } = order;
      const { address, city, postalCode, country } = shippingAddress;

      const itemsPrice = orderItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      return (
        <>
          <h1>Order {order._id}</h1>
          <Row style={{ marginTop: "1.5rem" }}>
            <Col md={8}>
              <ListGroup variant="flush">
                {!isPaid && (
                  <ListGroup.Item>
                    <Button variant="light" onClick={handleOrderDelete}>
                      Delete Order
                    </Button>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <h2 style={{ marginBottom: ".9m" }}>Shipping</h2>
                  <p>
                    <strong style={{ fontSize: ".95rem", fontWeight: "800 " }}>
                      Name:{" "}
                    </strong>{" "}
                    {user.name}
                  </p>
                  <p>
                    <strong style={{ fontSize: ".95rem", fontWeight: "800 " }}>
                      Email:{" "}
                    </strong>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </p>
                  <p>
                    <strong style={{ fontSize: ".95rem", fontWeight: "800 " }}>
                      Address:{" "}
                    </strong>
                    {address}, {city}, {postalCode}, {country}
                  </p>
                  {isDelivered ? (
                    <Alert variant="success" style={{ marginTop: "1em" }}>
                      Delivered on {deliveredAt}
                    </Alert>
                  ) : (
                    <Alert variant="danger" style={{ marginTop: "1em" }}>
                      Not Delivered
                    </Alert>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2 style={{ marginBottom: ".9em" }}>Payment Method</h2>
                  <p>
                    <strong style={{ fontSize: ".95rem", fontWeight: "800 " }}>
                      Method:{" "}
                    </strong>
                    {paymentMethod}
                  </p>
                  {isPaid ? (
                    <Alert variant="success" style={{ marginTop: "1em" }}>
                      Paid on {moment(paidAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </Alert>
                  ) : (
                    <Alert variant="danger" style={{ marginTop: "1em" }}>
                      Not paid
                    </Alert>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2 style={{ marginBottom: ".9em" }}>Order Items</h2>
                  {orderItems.length === 0 ? (
                    <Alert variant="warning" style={{ margin: ".75em 0em" }}>
                      Order is empty ! <Link to="/">Go Back</Link>
                    </Alert>
                  ) : (
                    <ListGroup variant="flush">
                      {orderItems.map((orderItem) => (
                        <ListGroup.Item key={orderItem._id}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={orderItem.image}
                                alt={orderItem.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${orderItem.id}`}>
                                {orderItem.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {orderItem.quantity} x ${orderItem.price} = $
                              {orderItem.price * orderItem.quantity}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col style={{ fontSize: ".95rem", fontWeight: "800 " }}>
                        Items:
                      </Col>
                      <Col>${formatTwoDecimalPlaces(itemsPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col style={{ fontSize: ".95rem", fontWeight: "800 " }}>
                        Shipping:
                      </Col>
                      <Col>${formatTwoDecimalPlaces(shippingPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col style={{ fontSize: ".95rem", fontWeight: "800 " }}>
                        Tax Price:
                      </Col>
                      <Col>${formatTwoDecimalPlaces(taxPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col style={{ fontSize: ".95rem", fontWeight: "800 " }}>
                        Total:
                      </Col>
                      <Col>${formatTwoDecimalPlaces(totalPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  {delivering && (
                    <Loader
                      type="Puff"
                      color="#00BFFF"
                      height={100}
                      width={100}
                    />
                  )}
                  {paying && (
                    <Loader
                      type="Puff"
                      color="#00BFFF"
                      height={100}
                      width={100}
                    />
                  )}
                  {userInfo && !isPaid && clientId && (
                    <ListGroup.Item>
                      <PayPalButton
                        amount={formatTwoDecimalPlaces(totalPrice)}
                        onSuccess={handlePaymentSuccess}
                        options={{
                          clientId: `${clientId}`,
                        }}
                      />
                    </ListGroup.Item>
                  )}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type="button"
                          className="btn-block"
                          onClick={handleOrderDelivered}
                        >
                          Mark As Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {loading && (
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        )}
        {deleting && (
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        )}
      </div>
      {renderError(error)}
      {renderOrderDetails(order)}
    </>
  );
});
