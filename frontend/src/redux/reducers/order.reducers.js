import { orderConstants } from '../constants/order.constants'

export const orderCreateReducer = (state = { ordering: false, error: null }, action) => {
    switch(action.type) {
        case orderConstants.ORDER_CREATE_REQUEST: {
            return {
                error: null,
                ordering: true
            }
        }

        case orderConstants.ORDER_CREATE_SUCCESS: {
            return {
                error: null,
                ordering: false
            }
        }

        case orderConstants.ORDER_CREATE_FAIL: {
            return {
                error: action.payload.error,
                ordering: false
            }
        }

        default: {
            return state;
        }
    }
}

export const orderDeleteReducer = (state = { deleting: false, error: null }, action) => {
    switch(action.type) {
        case orderConstants.ORDER_DELETE_REQUEST: {
            return {
                error: null,
                deleting: true
            }
        }

        case orderConstants.ORDER_DELETE_SUCCESS: {
            return {
                error: null,
                deleting: false
            }
        }

        case orderConstants.ORDER_DELETE_FAIL: {
            return {
                error: action.payload.error,
                deleting: false
            }
        }

        default: {
            return state;
        }
    }
}


export const orderDetailReducer = (state = { order: null, loading: false, error: null }, action) => {
    switch(action.type) {
        case orderConstants.ORDER_DETAIL_REQUEST: {
            return {
                error: null,
                loading: true,
                order: null
            }
        }

        case orderConstants.ORDER_DETAIL_SUCCESS: {
            return {
                error: null,
                loading: false,
                order: action.payload.order
            }
        }

        case orderConstants.ORDER_DETAIL_FAIL: {
            return {
                error: null,
                loading: false,
                error: action.payload.error
            }
        }

        default: {
            return state;
        }
    }
}

export const orderPayReducer = (state = { paying: false, error: null }, action) => {
    switch(action.type) {
        case orderConstants.ORDER_PAY_REQUEST: {
            return {
                error: null,
                paying: true
            }
        }

        case orderConstants.ORDER_PAY_SUCCESS: {
            return {
                error: null,
                paying: false,
            }
        }

        case orderConstants.ORDER_PAY_FAIL: {
            return {
                paying: false,
                error: action.payload.error
            }
        }

        default: {
            return state;
        }
    }
}

export const orderDeliverReducer = (state = { delivering: false, error: null }, action) => {
    switch(action.type) {
        case orderConstants.ORDER_DELIVER_REQUEST: {
            return {
                error: null,
                delivering: true
            }
        }

        case orderConstants.ORDER_DELIVER_SUCCESS: {
            return {
                error: null,
                delivering: false,
            }
        }

        case orderConstants.ORDER_DELIVER_FAIL: {
            return {
                delivering: false,
                error: action.payload.error
            }
        }

        default: {
            return state;
        }
    }
}


export const orderListMyReducer = (state = { orders: [], loading: false, error: null }, action) => {
    switch(action.type) {
        case orderConstants.ORDER_LIST_MY_REQUEST: {
            return {
                orders: [],
                loading: true,
                error: null
            }
        }

        case orderConstants.ORDER_LIST_MY_SUCCESS: {
            return {
                orders: action.payload.orders,
                loading: false,
                error: null
            }
        }

        case orderConstants.ORDER_LIST_MY_FAIL: {
            return {
                orders: [],
                loading: false,
                error: action.payload.error
            }
        }

        default: {
            return state;
        }
    }
}

export const orderListReducer = (state = { orders: [], loading: false, error: null }, action) => {
    switch(action.type) {
        case orderConstants.ORDER_LIST_REQUEST: {
            return {
                orders: [],
                error: null,
                loading: true
            }
        }

        case orderConstants.ORDER_LIST_SUCCESS: {
            const { orders, pages, page } = action.payload;
            return {
                orders,
                error: null,
                loading: false,
                pages,
                page
            }
        }

        case orderConstants.ORDER_LIST_FAIL: {
            return {
                orders: [],
                error: action.payload.error,
                loading: false
            }
        }

        default: {
            return state;
        }
    }
}