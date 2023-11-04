import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home/Home";


import AllProducts from "./pages/AllProducts/AllProducts";
import SingleProduct from "./pages/SingleProduct/SingleProduct";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AppContext from "./utils/context";
import Contact from "./pages/Contact/Contact";
import Map from "./components/Map/Map";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import OrderPage from "./pages/OrderPage/OrderPage";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <BrowserRouter>
      <AppContext>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Contact />
                <Footer />
              </>
            }
          />

          <Route
            path="/product/:id"
            element={
              <>
                <Header />
                <SingleProduct />
                <Footer />
              </>
            }
          />

          <Route
            path="/category"
            element={
              <>
                <Header />
                <AllProducts />
                <Footer />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
              </>
            }
          />

          <Route
            path="/register"
            element={
              <>
                <Header />
                <Register />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Header />
                <Contact />
                <Map />
                <Footer />
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <Header />
                <Search />
              </>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <>
                <Header />
                <Profile />
              </>
            }
          />
          <Route
            path="/edit-profile/:id"
            element={
              <>
                <Header />
                <EditProfile />
              </>
            }
          />
          <Route
            path="/order"
            element={
              <>
                <Header />
                <OrderPage />
              </>
            }
          />
        </Routes>
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
