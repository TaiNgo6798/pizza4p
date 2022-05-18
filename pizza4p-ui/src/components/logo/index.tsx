import React from "react";
import style from "./index.module.scss";

export const Logo: React.FC = () => {
  return (
    <div className={`${style.logo}`}>
      <img src="/images/logo.png" alt="pizza4p" height="58" />
      <h1>Pizza 4p's</h1>
    </div>
  );
};
