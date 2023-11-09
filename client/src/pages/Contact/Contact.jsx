import React, { useContext, useState } from "react";
import "./Contact.scss";
import { useForm } from "react-hook-form";

import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import axios from "axios";
const Contact = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const handleSubmitForm = async (data) => {
    try {
      await axios.post("/send-email", data);
      alert("Email sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Error sending email.");
    }
  };
  return (
    <div className="contact-section">
      <h1 className="title">CONTACT US</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="contact-content">
          <div className="contact-form">
            <div className="input-double">
              <div className="input-fullname">
                <input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  {...register("fullName", {
                    required: "Name is required",
                  })}
                />
                <span>{errors["fullName"]?.message}</span>
              </div>
              <div className="input-email">
                <input
                  id="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <span>{errors["email"]?.message}</span>
              </div>
            </div>
            <div className="input-subject">
              <input
                type="text"
                id="subject"
                placeholder="Subject"
                {...register("subject", {
                  required: "Subject is required",
                })}
              />
              <span>{errors["subject"]?.message}</span>
            </div>
            <div className="input-message">
              <textarea
                placeholder="Message"
                id="message"
                {...register("message", {
                  required: "Message is required",
                })}
              />
              <span>{errors["message"]?.message}</span>
            </div>
            <button type="submit">Submit</button>
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
      </form>
    </div>
  );
};

export default Contact;
