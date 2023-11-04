import React, { useContext, useEffect } from "react";
import "./Profile.scss";
import { Context } from "../../utils/context";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { user, setUser } = useContext(Context);
  const { user_id, email, full_name, phone, address } = user?.data;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user_id]);
  const handleLogout = async () => {
    await axios.post("/auth/logout");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-content">
        <div className="profile-info">
          <div className="heading">
            <h2>Full Name</h2>
            <BiUserCircle />
          </div>
          <p>{full_name}</p>
        </div>
        <div className="profile-info">
          <div className="heading">
            <h2>Email</h2>
            <AiOutlineMail />
          </div>
          <p>{email}</p>
        </div>
        <div className="profile-info">
          <div className="heading">
            <h2>Phone</h2>
            <BsFillTelephoneFill />
          </div>
          <p>{phone}</p>
        </div>
        <div className="profile-info">
          <div className="heading">
            <h2>Address</h2>
            <IoLocationSharp />
          </div>
          <p>{address}</p>
        </div>
      </div>
      <div className="profile-button">
        <button onClick={() => navigate(`/edit-profile/${user_id}`)}>
          Edit Profile
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
