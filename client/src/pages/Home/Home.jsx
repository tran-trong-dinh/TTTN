import React, { useContext, useEffect, useState } from "react";
import "./Home.scss";
import Banner from "../../components/Banner/Banner";
import Category from "./Category/Category";
import Products from "../../components/Products/Products";
import axios from "axios";
import { Context } from "../../utils/context";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <div className="category">
          <div className="sec-heading">category</div>
          <Category />
          </div>
          <div className="product">
          <div className="sec-heading">Popular Products</div>
          <Products />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
