import React, { useContext } from "react";
import "./OrderPage.scss";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";

const OrderPage = () => {
  const { user, totalPrice, cartItems, setShowCart } = useContext(Context);
  const navigate = useNavigate();
  const handlePay = () => {
    setShowCart(false);
    if (!user) {
      navigate("/login");
    } else {
      axios
        .post("/order/add-to-order", {
          products: cartItems,
          total_price: totalPrice,
        })
        .then((res) => {
          alert(res.data);
          navigate("/");
          window.location.reload();
        });
    }
  };
  return (
    <div className="order-container">
      <div className="order-wrapper">
        <div className="info-user">
          <h2>Thông tin thanh toán</h2>
          <div className="edit-profile-content">
            <div className="edit-profile-info">
              <div className="heading">
                <h2>Full Name</h2>
                <BiUserCircle />
              </div>
              <p className="input-edit-profile">{user?.data?.full_name}</p>
            </div>
            <div className="edit-profile-info">
              <div className="heading">
                <h2>Email</h2>
                <AiOutlineMail />
              </div>
              <p className="input-edit-profile">{user?.data?.email}</p>
            </div>
            <div className="edit-profile-info">
              <div className="heading">
                <h2>Phone</h2>
                <BsFillTelephoneFill />
              </div>
              <p className="input-edit-profile">{user?.data?.phone}</p>
            </div>
            <div className="edit-profile-info">
              <div className="heading">
                <h2>Address</h2>
                <IoLocationSharp />
              </div>
              <p className="input-edit-profile">{user?.data?.address}</p>
            </div>
          </div>
        </div>
        <div className="info-order">
          <h2>Đơn hàng của bạn</h2>
          <div className="products">
            {cartItems.map((item) => (
              <div className="product" key={item?.product_id}>
                <img src={item?.image_url} className="cart-product-image" />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item?.product_name}</h5>
                    <h4>${item?.new_price}</h4>
                  </div>
                  <div className="flex">
                    <div>
                      <p className="quantity-desc">
                        <span className="num">Quantity: {item.quantity}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="total">
            <h3>Total: ${totalPrice}</h3>
          </div>

          <button onClick={handlePay}>Order</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
