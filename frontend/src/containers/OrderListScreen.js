import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { getOrders } from '../redux/actions/order.actions'

import { Loader } from '../components/Loader'
import { Paginate } from '../components/Paginate'

import { withLayout } from "../HOCs/withLayout";

export const OrderListScreen = withLayout((props) => {
    const searchQueryParams = props.location.search;
    const searchParams = new URLSearchParams(searchQueryParams);
    const page = searchParams.get('page') || '';

    const dispatch = useDispatch();
    const { orders, pages, page: pageNumber, loading } = useSelector(state => state.orderList);

    useEffect(() => {
        dispatch(getOrders(page));
    }, [dispatch, page]);


    const handleUserDelete = (user) => {
        confirmAlert({
            title: 'Confirm to Delete User',
            message: 'Are you sure to delete this user ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => dispatch()
              },
              {
                label: 'No'
              }
            ]
        });
    }

    return (
        <>
          <h1 style={{ marginTop: '1rem' }}>Users</h1>
            <Table striped bordered hover responsive className='table-sm' style={{ marginTop: '1.5rem' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total Price</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders && orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>
                                <td>
                                    {moment(order.createdAt).format('MMMM Do YYYY')}
                                </td>
                                <td>
                                    ${order.totalPrice}
                                </td>
                                <td>{order.isPaid ? moment(order.paidAt).format('MMMM Do YYYY'): <i className='fas fa-times' style={{ color: 'red'}}></i>}</td>
                                <td>{order.isDelivered ? moment(order.deliveredAt).format('MMMM Do YYYY'): <i className='fas fa-times' style={{ color: 'red'}}></i>}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
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
            {loading && <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Loader />    
            </div>}
            <Paginate path='/admin/orderlist' page={pageNumber} pages={pages} />
        </>
    )
});
