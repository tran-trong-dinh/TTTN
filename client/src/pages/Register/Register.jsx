import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Register.scss";
import axios from "axios";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const handleRegister = async () => {
    if (!email || !password || !username) {
      return alert("Please fill all the fields");
    }
    if (password !== confirmPassword) {
      return alert("Password not match");
    }

    try {
      await axios.post("/auth/register", {
        email,
        username,
        password,
        full_name: fullname,
        phone,
      });
      alert("Register successfully");

      navigate("/login");
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="logo" width="130px" />
      </div>

      <div className="login-form">
        <div className="registry-double">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="login-input"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="registry-double">
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Full Name"
            className="login-input"
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="registry-double">
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="login-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="button-login" onClick={handleRegister}>
          Register
        </button>
      </div>

      <div className="login-registry">
        Have an account?{" "}
        <Link to="/login" className="login-text">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
