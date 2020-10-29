import { cartConstants } from '../constants/cart.constants'

const initialState = {
    cartItems: [], 
    shippingAddress: {},
    paymentMethod: ''
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case cartConstants.CART_ADD_ITEM: {
            const addedItem = action.payload.product;

            const existedItem = state.cartItems.find(cartItem => cartItem._id === addedItem._id);

            if (!existedItem) {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems,
                        action.payload.product
                    ]
                }
            } else {
                return {
                    ...state,
                    cartItems: state.cartItems.map(cartItem => cartItem._id === existedItem._id ? addedItem: cartItem)
                }
            }
        }

        case cartConstants.CART_REMOVE_ITEM: {
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem._id !== action.payload.product._id)
            }
        }

        case cartConstants.CART_RESET_ALL: {
            return {
                ...state,
                cartItems: []
            }
        }

        case cartConstants.CART_SAVE_SHIPPING_ADDRESS: {
            return {
                ...state,
                shippingAddress: action.payload.address
            }
        }

        case cartConstants.CART_SAVE_PAYMENT_METHOD: {
            return {
                ...state,
                paymentMethod: action.payload.paymentMethod
            }
        }

        default: {
            return state;
        }
    }
}