import React, { useContext, useState } from "react";
import "./OrderPage.scss";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { Provinces } from "../../utils/location/provinces";
import { Districts } from "../../utils/location/districts";
import { Wards } from "../../utils/location/wards";
const OrderPage = () => {
  const { user, totalPrice, cartItems, setShowCart } = useContext(Context);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState({});
  const [selectedWard, setSelectedWard] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
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
          address_order: `${detailedAddress}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince}`,
        })
        .then((res) => {
          alert(res.data);
          navigate("/");
          window.location.reload();
        });
    }
  };
  const handleProvinceChange = (selectedProvinceCode) => {
    const filteredDistricts = Districts.filter((district) => {
      return district.province_code === parseInt(selectedProvinceCode);
    });

    const province = Provinces.find(
      (province) => province.code === parseInt(selectedProvinceCode)
    );

    setSelectedProvince(province.name);
    setDistrictOptions(filteredDistricts);
    setWardOptions([]);
    setSelectedWard("");
    setSelectedDistrict("");
  };
  const handleDistrictChange = (selectedDistrictCode) => {
    const filteredWards = Wards.filter(
      (ward) => ward.district_code === parseInt(selectedDistrictCode)
    );

    const district = Districts.find(
      (district) => district.code === parseInt(selectedDistrictCode)
    );

    setSelectedDistrict(district.name);
    setSelectedWard("");
    setWardOptions(filteredWards);
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
                name="province"
                id="province"
                value={selectedProvince}
                onChange={(e) => {
                  handleProvinceChange(e.target.value);
                }}
              >
                <option value="">--- Chọn tỉnh ---</option>
                {Provinces &&
                  Provinces.map((province, idx) => {
                    return (
                      <option key={idx} value={province.code}>
                        {province.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="edit-profile-info">
              <div className="heading">
                <h2>Huyện</h2>
              </div>
              {/* <p className="input-edit-profile">{user?.data?.full_name}</p> */}
              <select
                className="input-edit-profile"
                name="district"
                id="district"
                value={selectedDistrict}
                onChange={(e) => {
                  handleDistrictChange(e.target.value);
                }}
              >
                <option value="">--- Chọn quận/huyện ---</option>
                {districtOptions &&
                  districtOptions.map((district, idx) => {
                    return (
                      <option key={idx} value={district.code}>
                        {district.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="edit-profile-info">
              <div className="heading">
                <h2>Xã</h2>
              </div>
              {/* <p className="input-edit-profile">{user?.data?.full_name}</p> */}
              <select
                className="input-edit-profile"
                name="ward"
                id="ward"
                value={selectedWard}
                onChange={(e) => {
                  setSelectedWard(e.target.value);
                }}
              >
                <option value="">--- Chọn xã/phường ---</option>
                {wardOptions &&
                  wardOptions.map((ward, idx) => {
                    return (
                      <option key={idx} value={ward.name}>
                        {ward.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="edit-profile-info">
              <div className="heading">
                <h2>Địa chỉ cụ thể</h2>
                <IoLocationSharp />
              </div>
              <input
                className="input-edit-profile"
                name="ward"
                id="ward"
                value={detailedAddress}
                onChange={(e) => setDetailedAddress(e.target.value)}
              ></input>
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
