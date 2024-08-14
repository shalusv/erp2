import React from "react";
import "./Hero.css"; // Import CSS for Hero
import heroImage from "../../../assets/images/client/hero/hero-home.jpg"; // Import Hero image
import logo from "../../../assets/images/admin/logo.png"; // Import logo image
import { NavLink } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <section style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-content">
        <img src={logo} alt="Logo" className="hero-logo" />
        <NavLink to="/admin/login" className="round-nav client">
          <FaTachometerAlt className="icon" />
        </NavLink>
      </div>
    </section>
  );
};

export default Hero;
