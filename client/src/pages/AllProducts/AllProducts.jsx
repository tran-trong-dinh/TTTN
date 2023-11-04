import "./AllProducts.scss";
import { useContext, useEffect } from "react";
import Filter from "../../components/Filter/Filter";
import Product from "../../components/Product/Product";
import { Context } from "../../utils/context";
const AllProducts = () => {
  const { products, filterProducts, handleFilterClick } = useContext(Context);

  useEffect(() => {
    handleFilterClick(products);
  }, [products]);

  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="left">
          <Filter listProducts={products} />
        </div>
        <div className="right">
          {filterProducts.length > 0 ? (
            <>
              <div className="category-title">Products</div>
              <div className="products-container">
                <div className="products">
                  {filterProducts.map((product) => (
                    <Product
                      key={product.product_id}
                      product={product}
                      id={product.product_id}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="category-title-not-found">
              Result : <p>Not Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
