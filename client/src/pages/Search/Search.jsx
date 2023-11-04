import "./Search.scss";
import { useContext, useEffect } from "react";
import Filter from "../../components/Filter/Filter";
import Product from "../../components/Product/Product";
import { Context } from "../../utils/context";
const Search = () => {
  const { results, filterProducts, handleFilterClick } = useContext(Context);
  useEffect(() => {
    handleFilterClick(results);
  }, [results]);

  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="left">
          <Filter listProducts={results} />
        </div>
        <div className="right">
          {filterProducts.length > 0 ? (
            <>
              <div className="category-title">Result</div>
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
            <div className="category-title-not-found">Not Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
