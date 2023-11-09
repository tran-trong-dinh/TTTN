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
  // const host = "https://provinces.open-api.vn/api/";
  // const callAPI = (api) => {
  //   return axios.get(api).then((response) => {
  //     renderData(response.data, "province");
  //   });
  // };
  // callAPI("https://provinces.open-api.vn/api/?depth=1");
  // const callApiDistrict = (api) => {
  //   return axios.get(api).then((response) => {
  //     renderData(response.data.districts, "district");
  //   });
  // };
  // const callApiWard = (api) => {
  //   return axios.get(api).then((response) => {
  //     renderData(response.data.wards, "ward");
  //   });
  // };

  //  const renderData = (array, select) => {
  //   let row = ' <option disable value="">chọn</option>';
  //   array.forEach((element) => {
  //     row += `<option value="${element.code}">${element.name}</option>`;
  //   });
  //   document.querySelector("#" + select).innerHTML = row;
  // };

  // $("#province").change(() => {
  //   callApiDistrict(host + "p/" + $("#province").val() + "?depth=2");
  //   printResult();
  // });
  // $("#district").change(() => {
  //   callApiWard(host + "d/" + $("#district").val() + "?depth=2");
  //   printResult();
  // });
  // $("#ward").change(() => {
  //   printResult();
  // });

  // const printResult = () => {
  //   if (
  //     $("#district").val() != "" &&
  //     $("#province").val() != "" &&
  //     $("#ward").val() != ""
  //   ) {
  //     let result =
  //       $("#province option:selected").text() +
  //       " | " +
  //       $("#district option:selected").text() +
  //       " | " +
  //       $("#ward option:selected").text();
  //     $("#result").text(result);
  //   }
  // };
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
          <h2>Thông tin khách hàng</h2>
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
            {/* <div className="edit-profile-info">
              <div className="heading">
                <h2>Address</h2>
                <IoLocationSharp />
              </div>
              <p className="input-edit-profile">{user?.data?.address}</p>
            </div> */}
          </div>
        </div>

        <div className="info-user">
          <h2>Thông tin nhận hàng</h2>
          <div className="edit-profile-content">
            <div className="edit-profile-info">
              <div className="heading">
                <h2>Tỉnh</h2>
              </div>
              {/* <p className="input-edit-profile">{user?.data?.full_name}</p> */}
              <select
                className="input-edit-profile"
                name=""
                id="province"
              ></select>
            </div>
            <div className="edit-profile-info">
              <div className="heading">
                <h2>Huyện</h2>
              </div>
              {/* <p className="input-edit-profile">{user?.data?.full_name}</p> */}
              <select className="input-edit-profile" name="" id="district">
                <option value="">chọn quận</option>
              </select>
            </div>
            <div className="edit-profile-info">
              <div className="heading">
                <h2>Xã</h2>
              </div>
              {/* <p className="input-edit-profile">{user?.data?.full_name}</p> */}
              <select className="input-edit-profile" name="" id="ward">
                <option value="">chọn phường</option>
              </select>
            </div>

            <div className="edit-profile-info">
              <div className="heading">
                <h2>Địa chỉ cụ thể</h2>
                <IoLocationSharp />
              </div>
              <input className="input-edit-profile"></input>
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
