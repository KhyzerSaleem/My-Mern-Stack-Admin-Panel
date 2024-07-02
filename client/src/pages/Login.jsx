import React, { useState } from "react";
import "./Login.css"; // Import CSS file for styling
const URL = `http://localhost:3000/api/auth/login`;
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// LoginForm component definition
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  const { login } = useAuth();

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
      //                  Perform form submission logic here
      console.log("Form Submitted: ", user);
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("Login Form", response);

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success("Login Successfull");

        storeTokenInLS(data.token);
        login(data.token);
        // store token in Localhost it comes from useContext API
        setUser({
          email: "",
          password: "",
        });
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
    <div className="login-page">
      <div className="image-container">
        <img src="/images/Login.svg" alt="Login" width={300} height={500} />
      </div>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              value={user.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              value={user.password}
              onChange={handleInput}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
