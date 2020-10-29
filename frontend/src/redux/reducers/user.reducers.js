import { authConstants } from '../constants/auth.constants'
import { userConstants } from '../constants/user.constants'

export const userAuthReducer = (state = { loading: false, error: null, userInfo: null }, action) => {
    switch (action.type) {
        case authConstants.USER_LOGIN_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }

        case authConstants.USER_LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                userInfo: action.payload.user
            }
        }

        case authConstants.USER_LOGIN_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }

        case authConstants.USER_LOGOUT: {
            return {
                userInfo: null,
                loading: false,
                error: null
            }
        }

        default: {
            return state;
        }
    }
}

export const userRegisterReducer = (state = { registering: false, error: null }, action) => {
    switch (action.type) {
        case authConstants.USER_REGISTER_REQUEST: {
            return {
                error: null,
                registering: true
            }
        }

        case authConstants.USER_REGISTER_SUCCESS: {
            return {
                error: null,
                registering: false
            }
        }

        case authConstants.USER_REGISTER_FAIL: {
            return {
                error: action.payload.error,
                registering: false,
            }
        }

        default: {
            return state;
        }
    }
}

export const userDetailReducer = (state = { user: {}, loading: false, error: null }, action) => {
    switch (action.type) {
        case userConstants.USER_DETAILS_REQUEST: {
            return {
                user: {},
                error: null,
                loading: true
            }
        }

        case userConstants.USER_DETAILS_SUCCESS: {
            return {
                error: null,
                user: action.payload.user,
                loading: false
            }
        }

        case userConstants.USER_DETAILS_FAIL: {
            return {
                error: action.payload.error,
                user: {},
                loading: false,
            }
        }

        default: {
            return state;
        }
    }
}

export const userUpdateReducer = (state = { updating: false, error: null }, action) => {
    switch (action.type) {
        case authConstants.USER_UPDATE_REQUEST: {
            return {
                error: null,
                updating: true
            }
        }

        case authConstants.USER_UPDATE_SUCCESS: {
            return {
                error: null,
                updating: false
            }
        }

        case authConstants.USER_UPDATE_FAIL: {
            return {
                error: action.payload.error,
                updating: false,
            }
        }

        default: {
            return state;
        }
    }
}


export const userListReducer = (state = { users: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case userConstants.USER_LIST_REQUEST: {
            return {
                users: [],
                loading: true,
                error: null
            }
        }

        case userConstants.USER_LIST_SUCCESS: {
            return {
                ...state,
                loading: false,
                users: action.payload.users
            }
        }

        case userConstants.USER_LIST_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }

        case userConstants.USER_LIST_RESET: {
            return {
                users: [],
                loading: false,
                error: null
            }
        }

        default: {
            return state;
        }
    }
}

export const userDeleteReducer = (state = { deleting: false, error: null }, action) => {
    switch (action.type) {
        case userConstants.USER_DELETE_REQUEST: {
            return {
                deleting: true,
                error: null
            }
        }

        case userConstants.USER_DELETE_SUCCESS: {
            return {
                deleting: false,
                error: null
            }
        }

        case userConstants.USER_DELETE_FAIL: {
            return {
                deleting: true,
                error: action.payload.error
            }
        }

        default: {
            return state;
        }
    }
}