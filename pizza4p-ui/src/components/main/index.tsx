import React, { useState } from "react";
import style from "./index.module.scss";
import { Card, Cart } from "components";
import { MobileCart } from "components/mobile-cart";
interface MenuItem {
  id: number;
  name: string;
  price: number;
  srcImg: string;
  des: string;
}

export const Main: React.FC = () => {
  const [menuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "Pizza1",
      des: "Supa hot pizza!",
      srcImg:
        "https://api.pizzahut.io/v1/content/en-ca/ca-1/images/pizza/pizza.supreme-lovers.3706cdc20b0752ac212c0d68a310fb18.1.jpg",
      price: 60,
    },
    {
      id: 2,
      name: "Pizza2",
      des: "Supa hot pizza!",
      srcImg:
        "https://api.pizzahut.io/v1/content/en-ca/ca-1/images/pizza/pizza.supreme-lovers.3706cdc20b0752ac212c0d68a310fb18.1.jpg",
      price: 70,
    },
    {
      id: 3,
      name: "Pizza3",
      des: "Supa hot pizza!",
      srcImg:
        "https://api.pizzahut.io/v1/content/en-ca/ca-1/images/pizza/pizza.supreme-lovers.3706cdc20b0752ac212c0d68a310fb18.1.jpg",
      price: 80,
    },
    {
      id: 4,
      name: "Pizza4",
      des: "Supa hot pizza!",
      srcImg:
        "https://api.pizzahut.io/v1/content/en-ca/ca-1/images/pizza/pizza.supreme-lovers.3706cdc20b0752ac212c0d68a310fb18.1.jpg",
      price: 20,
    },
    {
      id: 5,
      name: "Pizza5",
      des: "Supa hot pizza!",
      srcImg:
        "https://api.pizzahut.io/v1/content/en-ca/ca-1/images/pizza/pizza.supreme-lovers.3706cdc20b0752ac212c0d68a310fb18.1.jpg",
      price: 30,
    },
    {
      id: 6,
      name: "Pizza6",
      des: "Supa hot pizza!",
      srcImg:
        "https://api.pizzahut.io/v1/content/en-ca/ca-1/images/pizza/pizza.supreme-lovers.3706cdc20b0752ac212c0d68a310fb18.1.jpg",
      price: 63,
    },
  ]);

  return (
    <div className={`${style.container}`}>
      <div className={`${style.menu}`}>
        {menuItems.map((v) => {
          return (
            <Card
              id={v.id}
              key={v.id}
              name={v.name}
              price={v.price}
              des={v.des}
              srcImg={v.srcImg}
            />
          );
        })}
      </div>
      <div className={`${style.cart}`}>
        <Cart />
      </div>
      <div className={`${style.mobile_cart}`}>
        <MobileCart/>
      </div>
    </div>
  );
};
