import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";

export default function Error() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-text">404</h1>
      <p className="not-found-message">
        Oops! The page you are looking for could not be found.
      </p>
      <div className="button-container">
        <Link to="/" className="button">
          Home
        </Link>
        <Link to="/contact" className="button">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
