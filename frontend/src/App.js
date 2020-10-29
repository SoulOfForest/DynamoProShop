import React, { useEffect } from "react";
import { Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import './bootstrap.min.css'

import { HomeScreen } from './containers/HomeScreen'
import { ProductDetailScreen } from './containers/ProductDetailScreen'
import { CartScreen } from './containers/CartScreen'
import { LoginScreen } from './containers/LoginScreen'
import { RegisterScreen } from './containers/RegisterScreen'
import { ProfileScreen } from './containers/ProfileScreen'
import { ShippingScreen } from './containers/ShippingScreen'
import { PaymentScreen } from './containers/PaymentScreen'
import { PlaceOrderScreen } from './containers/PlaceOrderScreen'
import { OrderScreen } from './containers/OrderScreen'
import { UserListScreen } from './containers/UserListScreen'
import { UserEditScreen } from './containers/UserEditScreen'
import { ProductListScreen } from './containers/ProductListScreen'
import { ProductEditScreen } from './containers/ProductEditScreen'
import { OrderListScreen } from './containers/OrderListScreen'
import { ProtectedRoute } from './components/ProtectedRoute'
import { history } from './helpers/history'
import { alertActions } from './redux/actions/alert.actions'

function App() {
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alert);

  useEffect(() => {
    const { message, type } = alert;
    if (message && type) {
        toast[type](message);      
    }      
  }, [alert]);

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    })
  }, []);

  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/search" component={HomeScreen} />
        <Route path="/product/:id" component={ProductDetailScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <ProtectedRoute path="/profile" component={ProfileScreen} />
        <ProtectedRoute path="/shipping" component={ShippingScreen} />
        <ProtectedRoute path="/payment" component={PaymentScreen} />
        <ProtectedRoute path="/order" exact component={PlaceOrderScreen} />
        <ProtectedRoute path="/order/:id" component={OrderScreen} />
        <ProtectedRoute path="/admin/userlist" adminRequired component={UserListScreen} />
        <ProtectedRoute path="/admin/user/:id/edit" adminRequired component={UserEditScreen} />
        <ProtectedRoute path="/admin/productlist" adminRequired component={ProductListScreen} />
        <ProtectedRoute path="/admin/product/:id/edit" adminRequired component={ProductEditScreen} />
        <ProtectedRoute path="/admin/orderlist" adminRequired component={OrderListScreen} />
      </Router>
    </div>
  );
}

export default App;
