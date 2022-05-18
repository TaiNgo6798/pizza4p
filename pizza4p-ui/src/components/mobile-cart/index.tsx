import React, { useState } from "react";
import style from "./index.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { Button, Drawer } from "antd";
import { Cart } from "components/cart";

export const MobileCart: React.FC = () => {
  const orders = useSelector((state: RootState) => state.cart.orders);

  const [showDrawer, setShowDrawer] = useState(false)

  return (
    <div className={`${style.container}`}>
      <Drawer placement="right" visible={showDrawer} onClose={() => setShowDrawer(false)}>
        <Cart/>
      </Drawer>
      <p className={`${style.cart_count}`}>
        {orders.length > 0 &&
          orders.map((v) => v.count).reduce((total, item) => total + item)}{" "}
        item(s)
      </p>
      <Button type={"primary"} className={`${style.checkout_btn}`} onClick={() => setShowDrawer(true)}>
        Go to cart $
        {orders.length > 0 &&
          orders
            .map((v) => v.price * v.count)
            .reduce((total, item) => total + item)}
      </Button>
    </div>
  );
};
