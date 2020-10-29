import { cartConstants } from '../constants/cart.constants'
import { history } from '../../helpers/history'
import axios from '../../axios'

export const addItemToCart = (id, quantity) => {
    return async (dispatch, getState) => {
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: cartConstants.CART_ADD_ITEM,
            payload: {
                product: {
                    _id: data._id,
                    name: data.name,
                    image: data.image,
                    price: data.price,
                    countInStock: data.countInStock,
                    quantity 
                }
            }
        });
        
        history.push(`/cart`);

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }
}

export const removeItemFromCart = (id) => {
    return async (dispatch, getState) => {
        dispatch({
            type: cartConstants.CART_REMOVE_ITEM,
            payload: {
                product: {
                    _id: id
                }
            }
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }
}

export const saveShippingAddress = (address) => {
    return async (dispatch, getState) => {
        dispatch({
            type: cartConstants.CART_SAVE_SHIPPING_ADDRESS,
            payload: {
                address
            }
        });

        history.push('/payment');

        localStorage.setItem('shippingAddress', JSON.stringify(address));
    }
}

export const savePaymentMethod = (paymentMethod) => {
    return async (dispatch, getState) => {
        dispatch({
            type: cartConstants.CART_SAVE_PAYMENT_METHOD,
            payload: {
                paymentMethod
            }
        });

        history.push('/order');

        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
    }
}