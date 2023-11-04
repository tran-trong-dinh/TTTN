import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Login.scss";
import axios from "axios";
import { Context } from "../../utils/context";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(Context);
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please fill all the fields");
    }
    try {
      const data = await axios.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data));
      setUser(JSON.parse(localStorage.getItem("user")));
      alert("Login successfully");
      navigate("/");
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
        <input
          type="text"
          placeholder="Email or Username"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button-login" onClick={handleLogin}>
          Login
        </button>
      </div>

      <div className="login-registry">
        Don't have an account?{" "}
        <Link to="/register" className="login-text">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
