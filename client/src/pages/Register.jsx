import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform form submission logic here
      console.log("Form submitted:", user);

      const response = await fetch(
        `http://localhost:3000/api/auth/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      // console.log(response);
      const data = await response.json();
      console.log(data.error);

      if (response.ok) {
        // store token in Localhost it comes from useContext API
        storeTokenInLS(data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        toast.success("Registration Successfull");
        navigate("/");
      } else {
        toast.error(data.error ? data.error : data.message);
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log("Registration: ", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-image">
        <img src="/images/Registration1.gif" alt="Register" />
      </div>
      <div className="register-form-container">
        <form method="POST" className="register-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your Username"
            autoComplete="off"
            required
            // {...register("username", { required: "Username is required" })}
            value={user.username}
            onChange={handleInput}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            autoComplete="off"
            required
            // {...register("email", { required: "Email is required" })}
            value={user.email}
            onChange={handleInput}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            id="phone"
            name="phone"
            placeholder="Enter your Phone Number"
            autoComplete="off"
            required
            // {...register("phone", { required: "Phone is required" })}
            value={user.phone}
            onChange={handleInput}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
            autoComplete="off"
            required
            // {...register("password", { required: "Password is required" })}
            value={user.password}
            onChange={handleInput}
          />
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
