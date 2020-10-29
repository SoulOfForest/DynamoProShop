import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const { userInfo } = useSelector(state => state.userLogin);

    return (
        <Route 
            {...rest}
            render={props => {
                if (rest.adminRequired) {
                    return userInfo ? userInfo.isAdmin ? <Component {...props} /> : <Redirect to='/' /> : <Redirect to={{pathname: '/login', state: { from: props.location }}} /> 
                } else {
                    return !userInfo ? <Redirect to={{pathname: '/login', state: { from: props.location }}} /> : <Component {...props} />
                }
            }}
        />
    )
}
