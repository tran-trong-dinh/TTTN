import { Link } from "react-router-dom";
import "./SearchResultsList.scss";
import { Context } from "../../../utils/context";
import { useContext } from "react";

export const SearchResultsList = ({ handleShowList }) => {
  const { results, setFilterCategories, setMaxPrice, setMinPrice } =
    useContext(Context);
  return (
    <div
      className="results-list"
      onClick={() => {
        handleShowList();
        setFilterCategories(["All"]);
        setMaxPrice("");
        setMinPrice("");
      }}
    >
      {results.slice(0, 3).map((result, id) => (
        <Link
          to={`/product/${result.product_id}`}
          className="search-result"
          key={id}
        >
          <img src={result.image_url} alt="" />
          <div className="info-product">
            <span className="name">{result.product_name}</span>
            {result.new_price === result.old_price ? (
              <div className="price-wrapper">
                <span className="price">&#36;{result.old_price}</span>
              </div>
            ) : (
              <div className="price-wrapper">
                <span className="old-price">&#36;{result.old_price}</span>
                <span className="price">&#36;{result.new_price}</span>
              </div>
            )}
          </div>
        </Link>
      ))}
      {results.length > 3 && (
        <Link to={"/search"} className="result-text">
          View all results
        </Link>
      )}
    </div>
  );
};
