import React, { useState } from "react";
import "./About.css";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function About() {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <div className="about-section container">
      <div className="about-content">
        <div className="about-text">
          <p>
            Welcome
            {isLoggedIn && user
              ? ` ${user.username} to our website`
              : " to our website"}
          </p>
          <h1>About Us</h1>
          <p>
            Welcome to our company! We are dedicated to providing the best
            services to our clients. Our team of well-known developers works
            tirelessly to ensure customer satisfaction. With over 100,000 happy
            clients, we pride ourselves on delivering excellence.
          </p>
          <p>
            Our mission is to continue growing and adapting to the latest
            technological trends, ensuring that we offer the most advanced
            solutions. We believe in the power of innovation and the importance
            of maintaining a client-focused approach in everything we do.
          </p>
          <div className="btn-group">
            <Link to="/services">
              <button className="btn">Connect Now</button>
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
        <div className="about-image">
          <img
            src="/images/About.svg"
            alt="About Us"
            height={500}
            width={400}
          />
        </div>
      </div>
    </div>
  );
}
