import React, { useEffect } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { withLayout } from '../HOCs/withLayout'

import { Product } from '../components/Product'
import { Loader } from '../components/Loader'
import { Paginate } from '../components/Paginate'
import { ProductCarousel } from '../components/ProductCarousel'
import { Meta } from '../components/Meta'

import { fetchProducts, fetchTopProducts } from '../redux/actions/product.actions'
import { login } from '../redux/actions/user.actions'

export const HomeScreen = withLayout((props) => {
    const searchQueryParams = props.location.search;
    const searchParams = new URLSearchParams(searchQueryParams);
    const query = searchParams.get('q') || '';
    const page = searchParams.get('page') || '';

    const dispatch = useDispatch();
    const { products, pages, page: pageNumber, loading, error } = useSelector(state => state.productList);
    const { products: topProducts } = useSelector(state => state.productTopRated);
    const { type, message } = useSelector(state => state.alert);


    useEffect(() => {
        dispatch(fetchProducts(query, page));
    }, [dispatch, query, page]);

    useEffect(() => {
        dispatch(fetchTopProducts());
    }, [dispatch]);

    const renderProducts = (products) => {                
        return products.map(product => (<Col key={product._id} sm={12} md={6} lg={4} xs={3}><Product product={product} /></Col>))
    }

    return (
        <>
            <Meta />
            {
                !query ? <ProductCarousel products={topProducts}/> : <Link to='/' className='btn btn-light'>Go Back</Link>
            }
            <h1 style={{ marginTop: '1.5rem' }}>Latest Products</h1>
            {
                error && (
                    <Alert variant='danger' style={{ marginTop: '1em' }}>
                        This is a {error} alert—check it out!
                    </Alert>
                )
            }
            {loading && <Loader />}
            <Row>
                {products &&  renderProducts(products)}
            </Row>
            <Paginate page={pageNumber} pages={pages} keyword={query}/>
        </>
    )
});

