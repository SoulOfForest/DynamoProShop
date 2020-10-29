import { orderConstants } from '../constants/order.constants'
import { renderErrorResponse } from './product.actions'
import { history } from '../../helpers/history'
import { alertConstants } from '../constants/alert.constants'
import { cartConstants } from '../constants/cart.constants'
import axios from '../../axios'

export const getOrders = (pageNumber = '') => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: orderConstants.ORDER_LIST_REQUEST
            });
            
            axios.defaults.withCredentials = true;
            const { data } = await axios.get(`/api/orders?page=${pageNumber}`);

            const { orders, page, pages } = data;

            dispatch({
                type: orderConstants.ORDER_LIST_SUCCESS,
                payload: {
                    orders,
                    pages,
                    page
                }
            });
        } catch (err) {
            console.error(err);
            dispatch({
                type: alertConstants.WARNING,
                payload: {
                    message: renderErrorResponse(err).error
                }
            });

            dispatch({
                type: orderConstants.ORDER_LIST_FAIL,
                payload: renderErrorResponse(err)            
            })
        } 
    }
}

export const createOrder = (order) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: orderConstants.ORDER_CREATE_REQUEST
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            }            
            
            axios.defaults.withCredentials = true;
            const { data } = await axios.post('/api/orders', order, config);

            dispatch({
                type: orderConstants.ORDER_CREATE_SUCCESS
            });

            dispatch({
                type: cartConstants.CART_RESET_ALL
            });

            localStorage.removeItem('cartItems');

            history.push(`/order/${data._id}`);

            dispatch({ type: alertConstants.SUCCESS, payload: { message: '🐳 Create Order Successful!' }}); 
        } catch (err) {
            console.error(err);
            dispatch({
                type: alertConstants.WARNING,
                payload: {
                    message: renderErrorResponse(err).error
                }
            });

            dispatch({
                type: orderConstants.ORDER_CREATE_FAIL,
                payload: renderErrorResponse(err)            
            })
        } 
    }
}

export const deleteOrder = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: orderConstants.ORDER_DELETE_REQUEST
            });

            
            axios.defaults.withCredentials = true;
            await axios.delete(`/api/orders/${id}`);

            dispatch({
                type: orderConstants.ORDER_DELETE_SUCCESS
            });

            history.push(`/profile`);

            dispatch({ type: alertConstants.SUCCESS, payload: { message: '🐳 Delete Order Successful!' }}); 
        } catch (err) {
            console.error(err);
            dispatch({
                type: orderConstants.ORDER_DELETE_FAIL,
                payload: renderErrorResponse(err)            
            })
        } 
    }
}

export const getOrderDetails = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: orderConstants.ORDER_DETAIL_REQUEST
            });
            
            axios.defaults.withCredentials = true;
            const { data } = await axios.get(`/api/orders/${id}`);

            dispatch({
                type: orderConstants.ORDER_DETAIL_SUCCESS,
                payload: {
                    order: data
                }
            });
        } catch (err) {
            console.error(err);
            dispatch({
                type: orderConstants.ORDER_DETAIL_FAIL,
                payload: renderErrorResponse(err)            
            })
        } 
    }
}

export const getMyOrders = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: orderConstants.ORDER_LIST_MY_REQUEST
            });
            
            axios.defaults.withCredentials = true;
            const { data } = await axios.get(`/api/orders/my`);

            console.log(data);

            dispatch({
                type: orderConstants.ORDER_LIST_MY_SUCCESS,
                payload: {
                    orders: data
                }
            });
        } catch (err) {
            console.error(err);
            dispatch({
                type: orderConstants.ORDER_LIST_MY_FAIL,
                payload: renderErrorResponse(err)            
            })
        } 
    }
}


export const payOrder = (order, paymentResult) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: orderConstants.ORDER_PAY_REQUEST
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            } 

            const { orderItems, _id: id } = order;
            
            const orderItemsById = orderItems.map(orderItem => ({
                _id: orderItem._id,
                quantity: orderItem.quantity    
            }));
            
            axios.defaults.withCredentials = true;
            await axios.patch(`/api/orders/${id}/pay `, { orderItems: orderItemsById, paymentResult} , config);

            dispatch({
                type: orderConstants.ORDER_PAY_SUCCESS
            });

            dispatch({ type: alertConstants.SUCCESS, payload: { message: '🐳 Paid Order Successful!' }}); 

            dispatch(getOrderDetails(id));

            dispatch({
                type: cartConstants.CART_RESET_ALL
            });

            localStorage.removeItem('cartItems');
        } catch (err) {
            console.log(err);
            dispatch({
                type: orderConstants.ORDER_PAY_FAIL,
                payload: renderErrorResponse(err)            
            });
            
            dispatch({
                type: alertConstants.WARNING,
                payload: {
                    message: renderErrorResponse(err).error
                }
            });
        } 
    }
}

export const deliverOrder = (orderId) => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: orderConstants.ORDER_DELIVER_REQUEST
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            } 
            
            axios.defaults.withCredentials = true;
            await axios.put(`/api/orders/${orderId}/deliver `, {} , config);

            dispatch({
                type: orderConstants.ORDER_DELIVER_SUCCESS
            });

            dispatch(getOrderDetails(orderId));

            dispatch({ type: alertConstants.SUCCESS, payload: { message: '🐳 Order Delivered Successful!' }}); 
        } catch (err) {
            console.log(err);
            dispatch({
                type: orderConstants.ORDER_DELIVER_FAIL,
                payload: renderErrorResponse(err)            
            });
            
            dispatch({
                type: alertConstants.WARNING,
                payload: {
                    message: renderErrorResponse(err).error
                }
            });
        } 
    }
}