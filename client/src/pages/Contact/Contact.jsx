import React, { useContext, useState } from "react";
import "./Contact.scss";

import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import axios from "axios";
const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/send-email", {
        fullName,
        email,
        subject,
        message,
      });
      alert("Email sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Error sending email.");
    }
  };
  return (
    <div className="contact-section">
      <h1 className="title">CONTACT US</h1>
      <div className="contact-content">
        <div className="contact-form">
          <div className="input-double">
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className="contact-info">
          <div className="info">
            <FaLocationArrow />
            <span>
              70 To Ky Street, Tan Hung Thuan Ward, District 12, Ho Chi Minh
              City, Vietnam
            </span>
          </div>
          <div className="info">
            <FaMobileAlt />
            <span>0854 345 978</span>
          </div>
          <div className="info">
            <FaEnvelope />
            <span>double2d@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
