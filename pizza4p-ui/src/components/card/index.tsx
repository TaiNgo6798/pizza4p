import { Button } from "antd";
import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { useAppDispatch } from "redux/store";
import { updateOrder } from "redux/actions";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

interface CardProp {
  id: number
  name: string;
  price: number;
  srcImg: string;
  des: string;
}

export const Card: React.FC<CardProp> = (data) => {
  const { name, price, srcImg, des } = data
  const orders = useSelector((state: RootState) => state.cart.orders);

  const dispatch = useAppDispatch();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if(count >= 0){
      dispatch(updateOrder({...data, count}))
    }
    return () => {}
  }, [count])

  useEffect(() => {
    if(orders.length === 0){
      setCount(0)
    }
    return () => {}
  }, [orders])

  return (
    <div className={`${style.card}`}>
      <img className={`${style.image}`} src={srcImg} />
      <div className={`${style.detail}`}>
        <h3 className={`${style.name}`}>{name}</h3>
        <p className={`${style.des}`}>{des}</p>
        <div className={`${style.footer}`}>
          <Button
            type={"default"}
            className={`${style.button}`}
            onClick={() => setCount((prev) => (prev > 0 ? prev - 1 : 0))}
          >
            -
          </Button>
          <p className={`${style.count}`}>{count}</p>
          <Button
            type={"default"}
            className={`${style.button}`}
            onClick={() => setCount((prev) => prev + 1)}
          >
            +
          </Button>
          <p className={`${style.price}`}>${price}</p>
        </div>
      </div>
    </div>
  );
};
