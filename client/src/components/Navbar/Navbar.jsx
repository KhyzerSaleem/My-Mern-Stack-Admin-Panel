import React, { useState, useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import { useAuth } from "../../store/auth";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleLogout = () => {
    logout();
    toggleMenu(); // Close the menu after logging out
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <nav className="nav">
        <NavLink to="/" className="nav-logo">
          MERN-STACK
        </NavLink>
        <div
          className="menu-icon"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          role="button"
        >
          {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
        <div className={`nav-menu ${isOpen ? "nav-menu-active" : ""}`}>
          <NavLink to="/" className="nav-item" onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink to="/about" className="nav-item" onClick={toggleMenu}>
            About
          </NavLink>
          <NavLink to="/services" className="nav-item" onClick={toggleMenu}>
            Services
          </NavLink>
          <NavLink to="/contact" className="nav-item" onClick={toggleMenu}>
            Contact
          </NavLink>
          {isLoggedIn ? (
            <NavLink to="/logout" className="nav-item" onClick={handleLogout}>
              Logout
            </NavLink>
          ) : (
            <>
              <NavLink to="/register" className="nav-item" onClick={toggleMenu}>
                Register
              </NavLink>
              <NavLink to="/login" className="nav-item" onClick={toggleMenu}>
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
