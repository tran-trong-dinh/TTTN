import React, { useContext } from "react";
import "./Filter.scss";
import { BiDollar } from "react-icons/bi";
import { Context } from "../../utils/context";

const Filter = ({ listProducts }) => {

  const {
    categories,
    handleCategoryChange,
    handleMaxPriceChange,
    handleMinPriceChange,
    handleFilterClick,
  } = useContext(Context);




  return (
    <div className="filter-container">
      <div className="categories">
        <h3>Categories</h3>
        <select multiple  className="select" onChange={handleCategoryChange}>
          <option value="All" selected>
            All
          </option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_name}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>
      <div className="price">
        <h3>Price</h3>
        <div className="min-max">
          <div className="min">
            <BiDollar size={20} />
            <input
              type="text"
              placeholder="Min"
              onChange={handleMinPriceChange}
            />
          </div>
          <span>-</span>
          <div className="max">
            <BiDollar size={20} />
            <input
              type="text"
              placeholder="Max"
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
      </div>

      <button onClick={()=>handleFilterClick(listProducts)}>Apply</button>
    </div>
  );
};

export default Filter;
