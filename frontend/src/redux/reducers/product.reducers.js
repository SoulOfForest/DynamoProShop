import { productConstants } from '../constants/product.constants'

const initialState = {
    products: [],
    loading: false,
    error: null,
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case productConstants.PRODUCTS_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }

        case productConstants.PRODUCTS_SUCCESS: {
            const { products, page, pages } = action.payload;
            return {
                ...state,
                loading: false,
                products,
                page,
                pages
            }
        }

        case productConstants.PRODUCTS_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }

        default: {
            return state;
        }
    }
}

export const productCreateReducer = (state = { product: null, loading: false, error: null }, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_CREATE_REQUEST: {
            return {
                product: null,
                loading: true,
                error: null
            }
        }

        case productConstants.PRODUCT_CREATE_SUCCESS: {
            return {
                loading: false,
                error: null,
                product: action.payload.product
            }
        }

        case productConstants.PRODUCT_CREATE_FAIL: {
            return {
                product: null,
                loading: false,
                error: action.payload.error
            }
        }

        default: {
            return state;
        }
    }
}

export const productUpdateReducer = (state = { updating: false, error: null }, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_UPDATE_REQUEST: {
            return {
                updating: true,
                error: null
            }
        }

        case productConstants.PRODUCT_UPDATE_SUCCESS: {
            return {
                updating: false,
                error: null,
            }
        }

        case productConstants.PRODUCT_UPDATE_FAIL: {
            return {
                updating: false,
                error: action.payload.error
            }
        }

        default: {
            return state;
        }
    }
}


export const productDeleteReducer = (state = { deleting: false, error: null }, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_DELETE_REQUEST: {
            return {
                deleting: true,
                error: null
            }
        }

        case productConstants.PRODUCT_DELETE_SUCCESS: {
            return {
                deleting: false,
                error: null
            }
        }

        case productConstants.PRODUCT_DELETE_FAIL: {
            return {
                deleting: false,
                error: action.payload.error
            }
        }

        default: {
            return state;
        }
    }
}


export const productDetailReducer = (state = { detail: null, error: null, loading: false }, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_REQUEST: {
            return {
                detail: null,
                loading: true,
                error: null
            }
        }

        case productConstants.PRODUCT_SUCCESS: {
            return {
                ...state,
                loading: false,
                detail: action.payload.product
            }
        }

        case productConstants.PRODUCT_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }

        default: {
            return state;
        }
    }
}

export const productReviewCreateReducer = (state = { creating: false, error: null }, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_CREATE_REVIEW_REQUEST: {
            return {
                creating: true,
                error: null
            }
        }

        case productConstants.PRODUCT_CREATE_REVIEW_SUCCESS: {
            return {
                creating: false,
                error: null,
            }
        }

        case productConstants.PRODUCT_CREATE_REVIEW_FAIL: {
            return {
                creating: false,
                error: action.payload.error
            }
        }

        default: {
            return state;
        }
    }
}

export const productTopRatedReducer = (state = { products: [], loading: false }, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_TOP_REQUEST: {
            return {
                products: [],
                loading: true
            }
        }

        case productConstants.PRODUCT_TOP_SUCCESS: {
            return {
                products: action.payload.products,
                loading: false
            }
        }

        case productConstants.PRODUCT_TOP_FAIL: {
            return {
                loading: false,
                error: action.payload.error
            }
        }

        default: {
            return state;
        }
    }
}