import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { deleteProduct, fetchProducts, createProduct } from "../redux/actions/product.actions";

import { Loader } from "../components/Loader";
import { Paginate } from "../components/Paginate";

import { withLayout } from "../HOCs/withLayout";

export const ProductListScreen = withLayout((props) => {
  const searchQueryParams = props.location.search;
  const searchParams = new URLSearchParams(searchQueryParams);
  const page = searchParams.get('page') || '';

  const dispatch = useDispatch();
  const { products, pages, page: pageNumber, loading } = useSelector((state) => state.productList);
  const { deleting } = useSelector((state) => state.productDelete);
  const { loading: loadingCreate } = useSelector((state) => state.productCreate);

  useEffect(() => {
    dispatch(fetchProducts('', page));
  }, [dispatch, page]);

  const handleProductDelete = (product) => {
    confirmAlert({
      title: "Confirm to Delete User",
      message: "Are you sure to delete this user ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteProduct(product._id)),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleProductCreate = () => {
    dispatch(createProduct());
  }

  return (
    <>
        {deleting && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <Loader />
            </div>
        )}
        {loadingCreate && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <Loader />
            </div>
        )}
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={handleProductCreate}>
            <i className="fas fa-plus" style={{ marginRight: '.5rem' }}></i>
            Create Product
          </Button>
        </Col>
      </Row>
      <Table
        striped
        bordered
        hover
        responsive
        className="table-sm"
        style={{ marginTop: "1.5rem" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleProductDelete(product)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {loading && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Loader />
        </div>
      )}
      <Paginate path='/admin/productlist' page={pageNumber} pages={pages}/>
    </>
  );
});
