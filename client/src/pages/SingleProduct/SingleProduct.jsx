import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { FaCartPlus } from "react-icons/fa";
import "./SingleProduct.scss";
import axios from "axios";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import Review from "../../components/Review/Review";
import { Context } from "../../utils/context";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { onAdd, decQty, incQty, qty } = useContext(Context);
  useEffect(() => {
    axios.get(`/product/get-detail-product/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  useEffect(() => {
    axios
      .get(`/product/get-related-products/${product.category_id}/${id}`)
      .then((res) => {
        setRelatedProducts(res.data);
      });
  }, [id, product.category_id]);

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={product.image_url} />
          </div>
          <div className="right">
            <span className="name">{product.product_name}</span>

            {product.new_price === product.old_price ? (
              <span className="price">&#36;{product.old_price}</span>
            ) : (
              <div className="price-wrapper">
                <span className="old-price">&#36;{product.old_price}</span>
                <span className="new-price">&#36;{product.new_price}</span>
              </div>
            )}

            <span className="desc">{product.description}</span>

            <span className="desc">Stock: {product.stock}</span>

            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={decQty}>-</span>
                <span>{qty}</span>
                <span onClick={incQty}>+</span>
              </div>
              <button
                className="add-to-cart-button"
                onClick={() => {
                  onAdd(product, qty);
                }}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>

            <span className="divider" />
          </div>
        </div>
        <div className="sec-heading">Reviews</div>
        <Review productId={product.product_id} />
        <div className="sec-heading">Related Products</div>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
};

export default SingleProduct;
