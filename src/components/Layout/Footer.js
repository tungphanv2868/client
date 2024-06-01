import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";
import {
  AiFillFacebook,
  AiFillPhone,
  AiFillMail,
  AiFillHome,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <div>
        <ul className="social-icon">
        <li className="social-icon__item">
          <Link className="social-icon__link" to="/">
            <AiFillHome />
          </Link>
        </li>
        <li className="social-icon__item">
          <Link
            className="social-icon__link"
            to="https://www.facebook.com/ipetweb/"
          >
            <AiFillFacebook />
          </Link>
        </li>
        <li className="social-icon__item">
          <Link className="social-icon__link" to="/contact">
            <AiFillPhone />
          </Link>
        </li>
        <li className="social-icon__item">
          <Link className="social-icon__link" to="/contact">
            <AiFillMail />
          </Link>
        </li>
      </ul>
      <ul className="menu">
        <li className="menu__item">
          <Link className="menu__link" to="/about">
            About Us
          </Link>
        </li>
        <li className="menu__item">
          <Link className="menu__link" to="/contact">
            Contact
          </Link>
        </li>
        <li className="menu__item">
          <Link className="menu__link" to="/policy">
            Privacy Policy
          </Link>
        </li>
      </ul>
        </div>
      </div>
      <p>©2023 SHOP_PET | All rights reserved</p>
      <div>
          <Link rel="stylesheet" to="https://play.google.com/" target="_blank">
            <img src="/images/dowloadapp.png" alt="icon" style={{width:'270px', height:'150px'}} />
          </Link>
        </div>
    </footer>
  );
};

export default Footer;
