import React, { useState } from "react";
import "./Contact.css"; // Import CSS file for styling
import { useAuth } from "../store/auth";

// ContactUsPage component definition
const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [userData, setUserData] = useState(true);

  const { user } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserData(false);
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Message Send Successfully");
        setContact({
          username: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Failed to submit contact form");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <div className="contact-us-page">
      <div className="image-container">
        <img src="/images/Contact.svg" alt="Contact" width={500} height={400} />
      </div>
      <div className="form-container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              value={contact.username}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              value={contact.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              autoComplete="off"
              value={contact.message}
              onChange={handleInput}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="map-container">
        <iframe
          title="Combined-Fabrics Ltd"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.4383689616784!2d74.3722299746312!3d31.429596551623025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391907b3bc170f53%3A0x6c3d6f783fa20d3e!2sCombined%20Fabrics%20Limited!5e0!3m2!1sen!2s!4v1719224420884!5m2!1sen!2s"
          width={600}
          height={450}
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
