import React from "react";

import { Header, Main } from "components";

const Home: React.FC = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <Main />
    </div>
  );
};

export default Home;
