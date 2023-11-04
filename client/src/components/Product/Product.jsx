import React, { useContext } from "react";
import "./Product.scss";
import { Link } from "react-router-dom";
import { Context } from "../../utils/context";
const Product = ({ product, id }) => {
  const { image_url, product_name, old_price, new_price } = product;
  const { onAdd } = useContext(Context);
  return (
    <div className="product-card">
      <Link className="thumbnail" to={`/product/${id}`}>
        <img src={image_url} alt="product_image" />
      </Link>
      <div className="prod-details">
        <span className="name">{product_name}</span>
        <div className="price-button">
          {new_price === old_price ? (
            <div className="price-wrapper">
              <span className="price">&#36;{old_price}</span>
            </div>
          ) : (
            <div className="price-wrapper">
              <span className="old-price">&#36;{old_price} </span>
              <span className="price">&#36;{new_price}</span>
            </div>
          )}
          <button className="add-to-cart" onClick={() => onAdd(product, 1)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
