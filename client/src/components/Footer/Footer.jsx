import React from "react";
import "./Footer.scss";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="col">
          <div className="title">About</div>
          <div className="text">
          Welcome to our phone emporium! Discover a wide array of high-quality mobile phones and electronic gadgets catering to the needs of both tech enthusiasts and casual users. Explore our extensive collection featuring intricately detailed smartphones, tablets, and various tech devices. Whether you're a tech-savvy individual or just starting out, we've got something for everyone. Enjoy the experience of using and displaying these cutting-edge gadgets. Happy browsing!
          </div>
        </div>
        <div className="col">
          <div className="title">Contact</div>
          <div className="c-item">
            <FaLocationArrow />
            <div className="text">
              70 To Ky Street, Tan Hung Thuan Ward, District 12, Ho Chi Minh
              City, Vietnam
            </div>
          </div>
          <div className="c-item">
            <FaMobileAlt />
            <div className="text">Phone: 0854 345 978</div>
          </div>
          <div className="c-item">
            <FaEnvelope />
            <div className="text">Email: double2d@gmail.com</div>
          </div>
        </div>
        <div className="col">
          <div className="title">Categories</div>
          <span className="text">Samsung</span>
          <span className="text">Iphone</span>
          <span className="text">Xiaomi</span>
          <span className="text">Oppo</span>
        </div>
        <div className="col">
          <div className="title">Pages</div>
          <span className="text">Home</span>
          <span className="text">About</span>
          <span className="text">Privacy Policy</span>
          <span className="text">Returns</span>
          <span className="text">Terms & Conditions</span>
          <span className="text">Contact Us</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
