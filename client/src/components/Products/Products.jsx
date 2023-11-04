import "./Products.scss";
import Product from "../Product/Product";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../utils/context";

const Products = () => {
  const { products, setFilterCategories, setMinPrice, setMaxPrice } =
    useContext(Context);
    console.log(products)
  return (
    <>
      {products.length > 0 ? (
        <div className="products-container">
          <div className="products">
            {products.slice(0, 8).map((product) => (
              <Product
                key={product.product_id}
                product={product}
                id={product.product_id}
              />
            ))}
          </div>
          {products.length > 8 && (
            <div
              className="see-more"
              onClick={() => {
                setFilterCategories("All");
                setMaxPrice("");
                setMinPrice("");
              }}
            >
              <Link to={"/category"} className="see-more-text">
                See more
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>No Products Found</h1>
        </div>
      )}
    </>
  );
};

export default Products;
