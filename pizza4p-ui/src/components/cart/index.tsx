import React from "react";
import style from "./index.module.scss";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { clear, toggleLogin } from "redux/actions";

import { RootState } from "redux/reducers";
import { Button } from "antd";
import axios from "axios";

export const Cart: React.FC = () => {
  const orders = useSelector((state: RootState) => state.cart.orders);
  const dispatch = useAppDispatch();

const onCheckout = () => { 
  axios
      .get("http://localhost:3001/", {
        headers: {
          "Access-Control-Allow-Credentials": true,
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(clear())
      }).catch(() => {
        dispatch(toggleLogin(true))
      });
 }

  return (
    <>
      <h1>Cart</h1>
      <div className={`${style.list_order}`}>
        {orders.length > 0 && orders.map((order, k) => {
          return (
            <div key={k}>
              <div className={`${style.order}`}>
                <p>{order.count}x</p>
                <p>{order.name}</p>
                <p>${order.price}</p>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <div className={`${style.order_footer}`}>
        <div className={`${style.total}`}>
          <p>Total</p>
          <p>
            $
            {orders.length > 0 && orders
              .map((v) => v.price * v.count)
              .reduce((total, item) => total + item)}
          </p>
        </div>
        <Button className={`${style.order_button}`} type={"primary"} onClick={() => onCheckout()}>
          Checkout
        </Button>
      </div>
    </>
  );
};
