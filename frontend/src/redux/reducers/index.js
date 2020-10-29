import { combineReducers } from "redux";

import {
  productsReducer,
  productDetailReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer
} from "./product.reducers";
import {
  userAuthReducer,
  userRegisterReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userDetailReducer,
} from "./user.reducers";
import { cartReducer } from "./cart.reducers";
import { alertReducers } from "./alert.reducers";
import {
  orderCreateReducer,
  orderDetailReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeleteReducer,
  orderDeliverReducer,
} from "./order.reducers";

export const rootReducer = combineReducers({
  productList: productsReducer,
  productDetail: productDetailReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderList: orderListReducer,
  orderListMy: orderListMyReducer,
  orderDelete: orderDeleteReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userDetails: userDetailReducer,
  userLogin: userAuthReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  alert: alertReducers,
});
