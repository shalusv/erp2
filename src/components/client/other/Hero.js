import React from "react";
import "./Hero.css"; // Import CSS for Hero
import heroImage from "../../../assets/images/client/hero/hero-home.jpg"; // Import Hero image
import { NavLink } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <section style={{ backgroundImage: `url(${heroImage})` }}>
      <h2>Hero Section</h2>
      <li className="temp-btn">
        <NavLink to="/admin/login" className="link">
          <FaTachometerAlt className="icon" />
        </NavLink>
      </li>
      {/* Hero section content */}
    </section>
  );
};

export default Hero;
