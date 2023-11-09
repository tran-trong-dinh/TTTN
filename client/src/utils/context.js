import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct;
  let index;

  const [filterCategories, setFilterCategories] = useState(["All"]);

  const [filterProducts, setFilterProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [results, setResults] = useState([]);
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  // Xử lý khi nhấp vào nút lọc
  const handleFilterClick = (listProducts) => {
    const filteredProducts = listProducts
      .filter((product) => {
        // Kiểm tra category
        if (filterCategories == "All") {
          return true; // Nếu categoryFilter là 'all' thì giữ lại tất cả sản phẩm
        } else {
          return product.category_name.includes(filterCategories); // Nếu không, chỉ giữ lại sản phẩm có category trùng khớp
        }
      })
      .filter((product) => {
        // Kiểm tra price
        if (minPrice === "" && maxPrice === "") {
          return true; // Nếu không có minPrice và maxPrice thì giữ lại tất cả sản phẩm
        } else {
          const price = product.new_price;
          const min = parseInt(minPrice);
          const max = parseInt(maxPrice);
          return (
            (minPrice === "" || price >= min) &&
            (maxPrice === "" || price <= max)
          ); // Giữ lại sản phẩm nếu giá nằm trong khoảng min và max
        }
      });

    setFilterProducts(filteredProducts);
    console.log(filteredProducts);
  };
  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setFilterCategories(selectedCategories);
  };

  const fetchSearch = async (value) => {
    var categoryArray;
    categoryArray = await axios.get("/product/get-products").then((res) => {
      return res.data;
    });

    const results = categoryArray.filter((product) => {
      return (
        value &&
        product &&
        product.product_name &&
        product.product_name.toLowerCase().includes(value)
      );
    });
    setResults(results);
  };

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    axios.get("/product/get-products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/category/get-categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item.product_id === product.product_id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.new_price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.product_id === product.product_id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
  };
  const onRemove = (product) => {
    foundProduct = foundProduct = cartItems.find(
      (item) => item.product_id === product.product_id
    );
    const newCartItems = cartItems.filter(
      (item) => item.product_id !== product.product_id
    );
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.new_price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item.product_id === id);
    index = cartItems.findIndex((product) => product.product_id === id);
    const newCartItems = cartItems.filter((item) => item.product_id !== id);
    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + foundProduct.new_price
      );
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice - foundProduct.new_price
        );
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };
  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,

        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,

        user,
        setUser,
        handleMaxPriceChange,
        maxPrice,
        minPrice,
        handleMinPriceChange,
        handleFilterClick,
        setFilterCategories,
        filterCategories,
        handleCategoryChange,
        filterProducts,
        fetchSearch,
        results,
        setMaxPrice,
        setMinPrice,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
