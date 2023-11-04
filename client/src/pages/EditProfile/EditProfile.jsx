import React, { useContext, useEffect, useState } from "react";
import "./EditProfile.scss";
import { Context } from "../../utils/context";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, setUser } = useContext(Context);
  const { user_id, email, full_name, phone, address } = user?.data;

  const [editFullName, setEditFullName] = useState(full_name);
  const [EditEmail, setEditEmail] = useState(email);
  const [EditPhone, setEditPhone] = useState(phone);
  const [EditAddress, setEditAddress] = useState(address);
  const navigate = useNavigate();

  const handleEdit = async () => {
    await axios.post("/auth//update-profile", {
      full_name: editFullName,
      email: EditEmail,
      phone: EditPhone,
      address: EditAddress,
    });
    const newUser = {
      ...user,
      data: {
        ...user.data,
        full_name: editFullName,
        email: EditEmail,
        phone: EditPhone,
        address: EditAddress,
      },
    };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(JSON.parse(localStorage.getItem("user")));
    navigate(`/profile/${user_id}`);
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <div className="edit-profile-content">
        <div className="edit-profile-info">
          <div className="heading">
            <h2>Full Name</h2>
            <BiUserCircle />
          </div>
          <input
            type="text"
            className="input-edit-profile"
            value={editFullName}
            placeholder="Full Name"
            onChange={(e) => setEditFullName(e.target.value)}
          />
        </div>
        <div className="edit-profile-info">
          <div className="heading">
            <h2>Email</h2>
            <AiOutlineMail />
          </div>
          <input
            type="text"
            className="input-edit-profile"
            placeholder="Email"
            value={EditEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
        </div>
        <div className="edit-profile-info">
          <div className="heading">
            <h2>Phone</h2>
            <BsFillTelephoneFill />
          </div>
          <input
            type="text"
            className="input-edit-profile"
            placeholder="Phone"
            value={EditPhone}
            onChange={(e) => setEditPhone(e.target.value)}
          />
        </div>
        <div className="edit-profile-info">
          <div className="heading">
            <h2>Address</h2>
            <IoLocationSharp />
          </div>
          <input
            type="text"
            className="input-edit-profile"
            placeholder="Address"
            value={EditAddress}
            onChange={(e) => setEditAddress(e.target.value)}
          />
        </div>
      </div>
      <div className="edit-profile-button">
        <button onClick={handleEdit}>Save</button>
      </div>
    </div>
  );
};

export default EditProfile;
