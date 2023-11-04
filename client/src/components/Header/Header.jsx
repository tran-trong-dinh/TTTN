import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import "./Header.scss";

import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";
import logo from "../../assets/logo.png";
import { AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import { SearchResultsList } from "./Search/SearchResultsList";

const Header = () => {
  const { user, fetchSearch, setUser } = useContext(Context);
  const [scrolled, setScrolled] = useState(false);

  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const navigate = useNavigate();
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const { totalQuantities, showCart, setShowCart } = useContext(Context);

  const handleLogout = async () => {
    await axios.post("/auth/logout");
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleChange = (value) => {
    setSearch(value);
    fetchSearch(value);
  };

  const handleShowList = () => {
    setShowList(!showList);
  };

  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <div className="left" onClick={() => navigate("/")}>
            <img src={logo} alt="" className="logo" />
          </div>
          <ul className="center">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/category")}>Products</li>
            <li onClick={() => navigate("/contact")}>Contact</li>
          </ul>

          <div className="right">
            <div className="search">
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                value={search}
                onFocus={handleShowList}
                onChange={(e) => handleChange(e.target.value)}
              />
              {showList && (
                <SearchResultsList handleShowList={handleShowList} />
              )}

              <TbSearch />
            </div>

            <span className="cart-icon" onClick={() => setShowCart(true)}>
              <CgShoppingCart />
              {!!totalQuantities && <span>{totalQuantities}</span>}
            </span>
            {user ? (
              <div className="user-wrapper">
                <Link to={`/profile/${user.data.user_id}`} className="user">
                  {user.data.full_name}
                </Link>
                <AiOutlineLogout onClick={handleLogout} />
              </div>
            ) : (
              <Link to="/login" className="button-login">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>
      {showCart && <Cart />}
    </>
  );
};

export default Header;
