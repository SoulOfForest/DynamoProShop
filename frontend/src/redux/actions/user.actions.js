import { authConstants } from "../constants/auth.constants"
import { renderErrorResponse } from './product.actions'
import { history } from '../../helpers/history'
import { alertConstants } from '../constants/alert.constants'
import { cartConstants } from '../constants/cart.constants'
import { userConstants } from '../constants/user.constants'
import axios from '../../axios'

export const login = (email, password, referrer) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: authConstants.USER_LOGIN_REQUEST
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            }            
            
            axios.defaults.withCredentials = true;
            const { data } = await axios.post('/api/auth/login', { email, password }, config);
            
            dispatch({
                type: authConstants.USER_LOGIN_SUCCESS,
                payload: {
                    user: data
                }
            });

            history.push(referrer.from.pathname);
            
            dispatch({
                type: alertConstants.SUCCESS,
                payload: {
                    message: '🐳 Login successful' 
                }
            })
        } catch (err) {
            console.error(err);
            dispatch({
                type: authConstants.USER_LOGIN_FAIL,
                payload: renderErrorResponse(err)            
            })
        } 
    }
}

export const logout = () => {
    return async (dispatch, getState) => {
        try {
            axios.defaults.withCredentials = true;
            await axios.get('/api/auth/logout');
            
            dispatch({
                type: authConstants.USER_LOGOUT
            });

            dispatch({
                type: userConstants.USER_LIST_RESET
            })
            
            history.push('/');

            dispatch({
                type: alertConstants.SUCCESS,
                payload: {
                    message: '🐳 Logout successful' 
                }
            })
        } catch (err) {
            console.error(err);
            dispatch({
                type: authConstants.USER_LOGIN_FAIL,
                payload: renderErrorResponse(err)            
            })
        } 
    }
}

export const registerAction = (name, email, password) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: authConstants.USER_REGISTER_REQUEST
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            }            
            
            axios.defaults.withCredentials = true;
            const { data } = await axios.post('/api/auth/register', { name, email, password }, config);

            dispatch({
                type: authConstants.USER_LOGIN_SUCCESS,
                payload: {
                    user: data
                }
            });

            dispatch({ type: authConstants.USER_REGISTER_SUCCESS });

            history.push('/');

            dispatch({ type: alertConstants.SUCCESS, payload: { message: '🐳 Register Successful !' }}); 
        } catch (err) {
            console.error(err);
            dispatch({
                type: authConstants.USER_REGISTER_FAIL,
                payload: renderErrorResponse(err)            
            })
        } 
    }
}

export const userUpdateProfile = (name, email, password) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: authConstants.USER_UPDATE_REQUEST
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            }            
            
            axios.defaults.withCredentials = true;
            const { data } = await axios.patch('/api/auth/profile', { name, email, password }, config);

            dispatch({
                type: authConstants.USER_LOGIN_SUCCESS,
                payload: {
                    user: data
                }
            });

            dispatch({ type: authConstants.USER_UPDATE_SUCCESS });

            dispatch({ type: alertConstants.SUCCESS, payload: { message: '🐳 Update Profile Successful!' }}); 
        } catch (err) {
            console.error(err);
            dispatch({
                type: authConstants.USER_UPDATE_FAIL,
                payload: renderErrorResponse(err)            
            })
        } 
    }
}

export const listUsers = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: userConstants.USER_LIST_REQUEST
            });

            axios.defaults.withCredentials = true;
            const { data } = await axios.get('/api/users');

            dispatch({
                type: userConstants.USER_LIST_SUCCESS,
                payload: {
                    users: data
                }
            });
        } catch (err) {
            console.error(err);
            dispatch({
                type: userConstants.USER_LIST_FAIL,
                payload: renderErrorResponse(err)            
            })
        } 
    }
}

export const getUserDetails = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: userConstants.USER_DETAILS_REQUEST
            });

            axios.defaults.withCredentials = true;
            const { data } = await axios.get(`/api/users/${id}`);

            dispatch({
                type: userConstants.USER_DETAILS_SUCCESS,
                payload: {
                    user: data
                }
            });
        } catch (err) {
            console.error(err);
            dispatch({
                type: userConstants.USER_DETAILS_FAIL,
                payload: renderErrorResponse(err)            
            })
        } 
    }
}

export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: userConstants.USER_DELETE_REQUEST
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            }    

            axios.defaults.withCredentials = true;
            const { data } = await axios.delete(`/api/users/${id}`, config);

            dispatch({
                type: userConstants.USER_DELETE_SUCCESS,
            });

            dispatch(listUsers());

            dispatch({ type: alertConstants.SUCCESS, payload: { message: '🐳 Delete User Successful!' }}); 
        } catch (err) {
            console.error(err);
            dispatch({
                type: userConstants.USER_DELETE_FAIL,
                payload: renderErrorResponse(err)            
            })
        } 
    }
}

export const updateUser = (isAdmin, name, email) => {
    return async (dispatch, getState) => {
        try {
            const userId = getState().userDetails.user._id;

            dispatch({
                type: authConstants.USER_UPDATE_REQUEST
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            }    

            axios.defaults.withCredentials = true;
            const { data } = await axios.put(`/api/users/${userId}`, { name, email, isAdmin }, config);

            dispatch({
                type: authConstants.USER_UPDATE_SUCCESS,
            });

            history.push('/admin/userlist');

            dispatch({ type: alertConstants.SUCCESS, payload: { message: '🐳 Update User Successful!' }}); 
        } catch (err) {
            console.error(err);
            dispatch({
                type: authConstants.USER_UPDATE_FAIL,
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