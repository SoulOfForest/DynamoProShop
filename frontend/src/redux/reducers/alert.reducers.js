import { alertConstants } from '../constants/alert.constants'

export const alertReducers = (state = {}, action) => {
    switch (action.type) {
        case alertConstants.SUCCESS: {
            return {
                type: 'success',
                message: action.payload.message
            }
        }
        case alertConstants.ERROR: {
            return {
                type: 'error',
                message: action.payload.message
            }
        }
        case alertConstants.WARNING: {
            return {
                type: 'warning',
                message: action.payload.message
            }
        }
            
        case alertConstants.CLEAR: {
            return {};
        }
            
        default: {
            return state;
        }
    }
}